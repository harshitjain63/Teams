import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ProfileHeader from '../Components/profile/ProfileHeader';
import ProfileForm from '../Components/profile/ProfileForm';
import {useAppDispatch, useAppSelector} from '../redux/hooks/customHook';
import {ActivityIndicator, Text} from 'react-native-paper';
import {fetchDetails} from '../redux/services/userSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProfileProps = NativeStackScreenProps<RootStackParams, 'Profile'>;

type userData = {
  id: string;
  name: string;
  email: string;
  designation: string | null;
};

const Profile = ({navigation, route}: ProfileProps) => {
  const [userData, setUserData] = useState<userData>({
    id: '',
    name: '',
    email: '',
    designation: '',
  });

  const {userDetails, loading, error} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user_data');
        if (value !== null) {
          const usersData = JSON.parse(value);
          setUserData(usersData);
        } else {
          // If no data in AsyncStorage, fetch details
          dispatch(fetchDetails());
        }
      } catch (err) {
        console.log((err as any).message);
      }
    };

    retrieveData();
  }, [dispatch]);

  useEffect(() => {
    const storeData = async () => {
      try {
        // Only store new data if it's valid and different from the current state
        if (
          userDetails &&
          userDetails.email &&
          userDetails.email !== userData.email
        ) {
          const serializedUserData = JSON.stringify(userDetails);
          await AsyncStorage.setItem('user_data', serializedUserData);
          setUserData(userDetails); // Update local state to reflect new data
        }
      } catch (err) {
        console.log((err as any).message);
      }
    };

    if (userDetails && userDetails.email) {
      storeData();
    }
  }, [userDetails, userData]);

  return (
    <View style={styles.container}>
      <ProfileHeader />
      {loading && <ActivityIndicator size={'large'} color="blue" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {userData.email.length > 0 ? (
        <ProfileForm
          userDetails={userData}
          navigation={navigation}
          route={route}
        />
      ) : (
        userDetails.email.length > 0 && (
          <ProfileForm
            userDetails={userDetails}
            navigation={navigation}
            route={route}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  error: {
    color: 'red',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default Profile;
