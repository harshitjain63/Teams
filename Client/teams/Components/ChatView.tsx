import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Images} from '../constants/Image';
import LinearGradient from 'react-native-linear-gradient';

const ChatView = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00FFFF', '#8A2BE2']}
        style={styles.gradientProfile}>
        <View>
          <Image style={styles.profile_pic} source={Images.chaticon} />
        </View>
      </LinearGradient>

      <LinearGradient
        colors={['#00FFFF', '#8A2BE2']}
        style={styles.gradientMessage}>
        <View style={styles.messageContainer}>
          <Text style={styles.msg_text}>Message Aya Hai Bhai</Text>
        </View>
      </LinearGradient>
      <Text style={styles.time_text}>12:33</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    marginVertical: 10,
    gap: 8,
  },
  time_text: {
    fontSize: 12,
    color: 'grey',
    top: 12,
    fontWeight: '500',
  },
  gradientMessage: {
    maxWidth: '60%',
    padding: 10,
    borderRadius: 20,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  msg_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  gradientProfile: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_pic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default ChatView;
