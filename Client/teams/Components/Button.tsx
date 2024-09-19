import {TouchableOpacity, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Buttons = (props: {
  txt: string;
  onpress: () => void;
  styles?: ViewStyle | ViewStyle[];
}) => {
  return (
    <LinearGradient
      colors={['#00FFFF', '#8A2BE2']} // Cyan to purple gradient
      style={[styles.Button_wrapper, props.styles]}>
      <TouchableOpacity style={styles.container} onPress={props.onpress}>
        <Text style={styles.txt}>{props.txt}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Button_wrapper: {
    height: 45,
    width: '85%',
    padding: 10,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  txt: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default Buttons;
