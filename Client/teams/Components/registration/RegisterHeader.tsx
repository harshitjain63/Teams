import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../constants/Image';

const {height} = Dimensions.get('window');

const RegisterHeader = () => {
  return (
    <LinearGradient
      colors={['#00FFFF', '#8A2BE2']} // Gradient from cyan to purple
      style={styles.gradientBackground}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Teams App</Text>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={Images.chaticon} />
        </View>
      </View>

      <View style={styles.curvedShape} />
    </LinearGradient>
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
  gradientBackground: {
    width: '100%',
    height: height * 0.3, // 30% of the screen height
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iconContainer: {
    marginTop: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Ensure the icon is above the curved shape
  },
  icon: {
    width: 50,
    height: 50,
  },
  curvedShape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 1, // Ensure the curved shape is behind the icon and header
  },
  formContainer: {
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  input: {
    marginBottom: 15,
    width: '100%',
  },
  custom_button: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default RegisterHeader;
