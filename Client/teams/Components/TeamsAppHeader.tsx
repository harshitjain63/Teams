import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../constants/Image';

const TeamsAppHeader = () => {
  return (
    <LinearGradient
      colors={['#00FFFF', '#8A2BE2']} // Gradient from cyan to purple
      style={styles.gradientBackground}>
      <View style={styles.container}>
        {/* Header Text */}
        <Text style={styles.headerText}>Teams App</Text>

        {/* Chat Icon (placeholder for now) */}
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={Images.chaticon} />
        </View>

        {/* Curved shape at the bottom */}
        <View style={styles.curvedShape} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 50, // Adjust as per your design needs
  },
  iconContainer: {
    marginTop: 20,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  curvedShape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});

export default TeamsAppHeader;
