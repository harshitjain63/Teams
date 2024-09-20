import {View, StyleSheet} from 'react-native';
import React from 'react';
import FormComponent from './FormComponent';

type User = {
  userDetails: {
    name: string;
    email: string;
    id: string;
    designation: string | null;
  };
};

const ProfileForm = ({userDetails}: User) => {
  const {name, email, id, designation} = userDetails;
  console.log('>>><<<', userDetails.name);
  return (
    <View style={styles.container}>
      <FormComponent val={id} label={'ID'} disabled={true} />
      <FormComponent val={name} label={'Name'} disabled={true} />
      <FormComponent val={email} label={'Email'} disabled={true} />
      <FormComponent val={designation} label={'Designation'} disabled={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});
export default ProfileForm;
