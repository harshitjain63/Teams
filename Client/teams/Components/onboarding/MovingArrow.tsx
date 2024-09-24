// MovingArrowButton.tsx
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {Images} from '../../constants/Image';

interface MovingArrowButtonProps {
  title: string;
  onPress: () => void;
  containerStyles?: object;
  textStyles?: object;
  imageStyles?: object;
}

const MovingArrowButton: React.FC<MovingArrowButtonProps> = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  imageStyles,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const screenWidth = -Dimensions.get('window').width;

    const animateBackAndForth = Animated.sequence([
      Animated.timing(translateX, {
        toValue: screenWidth / 6,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(animateBackAndForth).start();
  }, [translateX]);

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, containerStyles]}
      onPress={onPress}>
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
      <Animated.Image
        source={Images.bluearrowicon}
        style={[styles.arrow, {transform: [{translateX}]}, imageStyles]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: '6%',
  },
  arrow: {
    marginLeft: '30%',
    width: '13%',
    height: '50%',
  },
});

export default MovingArrowButton;
