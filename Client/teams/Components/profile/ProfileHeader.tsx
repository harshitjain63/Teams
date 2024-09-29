import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {Images} from '../../constants/Image';

const ProfileHeader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to handle image selection
  const pickImageFromGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
    };

    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        Alert.alert('Image selection canceled');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error occurred');
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        if (selectedAsset.uri) {
          setSelectedImage(selectedAsset.uri);
        }
      }
    } catch (err) {
      console.log('Error while selecting image:', err);
      Alert.alert('Error', 'Something went wrong while selecting the image');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageFromGallery}>
        <Image
          style={styles.img}
          source={selectedImage ? {uri: selectedImage} : Images.profileicon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50, // Optional: Make image circular
  },
});

export default ProfileHeader;
