import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ProfileHeader from '../Components/profile/ProfileHeader';
import ProfileForm from '../Components/profile/ProfileForm';
import {useAppDispatch, useAppSelector} from '../redux/hooks/customHook';
import {ActivityIndicator, Text} from 'react-native-paper';
import {fetchDetails} from '../redux/services/userSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';

export type ProfileProps = NativeStackScreenProps<RootStackParams, 'Profile'>;

const Profile = ({navigation, route}: ProfileProps) => {
  const {userDetails, loading, error} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ProfileHeader />
      {loading && <ActivityIndicator size={'large'} color="blue" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {userDetails.email.length > 0 && (
        <ProfileForm
          userDetails={userDetails}
          navigation={navigation}
          route={route}
        />
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
