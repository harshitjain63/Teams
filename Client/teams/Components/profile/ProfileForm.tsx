import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import FormComponent from './FormComponent';
import {Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/customHook';
import {clearToken} from '../../redux/services/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileProps} from '../../Screens/Profile';
import axiosInstance from '../../middleware/axiosConfig/axiosConfig';
import {logout} from '../../redux/services/userSlice';
import {
  fetchProfileTranslationsFromDB,
  insertProfileTranslations,
} from '../database/DatabaseProfile';
import {
  fetchHindiTranslations,
  fetchEnglishTranslations,
} from '../languages/api';
import {useTranslation} from 'react-i18next';

type User = {
  userDetails: {
    name: string;
    email: string;
    id: string;
    designation: string | null;
  };
};

type Props = User & ProfileProps;

const ProfileForm = ({userDetails, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation('profile'); // Use the 'profile' namespace

  const [translations, setTranslations] = useState<any>({});
  const selectedLanguage = useAppSelector(
    state => state.language.selectedLanguage,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translationsFromDB = await fetchProfileTranslationsFromDB(
          selectedLanguage,
        );
        console.log('-------', translationsFromDB);

        if (translationsFromDB) {
          // If translations are found in the database
          setTranslations(translationsFromDB);
        } else {
          if (selectedLanguage === 'hi') {
            const data = await fetchHindiTranslations();
            console.log('33333333333', data);
            if (data) {
              setTranslations(data.profile);

              // Insert the fetched translations into the database
              await insertProfileTranslations(data.profile, selectedLanguage);
            } else {
              console.warn('Translations not found for the selected language');
            }
          } else {
            const data = await fetchEnglishTranslations();
            if (data) {
              setTranslations(data.profile);
              // Insert the fetched translations into the database
              await insertProfileTranslations(data.profile, selectedLanguage);
            } else {
              console.warn('Translations not found for the selected language');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching translations for login:', error);
      }
    };
    fetchData();
  }, [selectedLanguage]);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get('/user/logout');
      if (response.data) {
        dispatch(clearToken());
        dispatch(logout());
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log((error as any).message);
    }
  };
  const {name, email, id, designation} = userDetails;
  console.log('>>><<<', userDetails.name, id);
  return (
    <View style={styles.container}>
      {/* <FormComponent val={id} label={'ID'} disabled={true} /> */}
      <FormComponent val={name} label={t('name_placeholder')} disabled={true} />
      <FormComponent
        val={email}
        label={t('email_placeholder')}
        disabled={true}
      />
      <FormComponent
        val={designation}
        label={t('designation_placeholder')}
        disabled={true}
      />

      <Button onPress={handleLogout} style={styles.btn}>
        Logout
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  btn: {
    alignSelf: 'center',
  },
});
export default ProfileForm;
