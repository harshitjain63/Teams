import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {Images} from '../../constants/Image';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../middleware/axiosConfig/axiosConfig';

const ProfileHeader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImageFromStorage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setSelectedImage(savedImage);
        }
      } catch (error) {
        console.log('Error loading image from storage', error);
      }
    };
    loadImageFromStorage();
  }, []);

  const postImage = async () => {
    const data = new FormData();
    data.append('profile_image', selectedImage);
    const response = await axiosInstance.post(
      '/user/update/profile?_method=PUT',
      data,
    );
    console.log('response', response);
  };

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      console.log(';;;;;;', response);
      if (response.didCancel) {
        Alert.alert('Image selection canceled');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error occurred');
      } else {
        let imageUri = response.assets?.[0]?.uri!;
        if (imageUri) {
          setSelectedImage(imageUri);

          try {
            // Save the selected image URI to local storage
            await postImage();
            console.log('00000000000', selectedImage);
            await AsyncStorage.setItem('profileImage', imageUri);
          } catch (error) {
            console.log('Error saving image to storage', error);
          }
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImagePicker}>
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
    borderRadius: 50,
  },
});

export default ProfileHeader;
