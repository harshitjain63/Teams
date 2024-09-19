/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet, ScrollView} from 'react-native';
import RegisterHeader from '../Components/registration/RegisterHeader';
import Form from '../Components/registration/Form';

const Register = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <RegisterHeader />
        <Form />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Register;
