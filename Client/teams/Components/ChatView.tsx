import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Images} from '../constants/Image';
import LinearGradient from 'react-native-linear-gradient';

const ChatView = ({
  message,
  id,
  timestamp,
}: {
  message: string;
  id: number;
  timestamp?: string;
}) => {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: id === 2 ? 'row' : 'row-reverse'},
      ]}>
      <LinearGradient
        colors={['#00FFFF', '#8A2BE2']}
        style={styles.gradientProfile}>
        <View>
          <Image style={styles.profile_pic} source={Images.chaticon} />
        </View>
      </LinearGradient>

      <LinearGradient
        colors={id === 2 ? ['#FFF', '#FFF'] : ['#00FFFF', '#8A2BE2']}
        style={styles.gradientMessage}>
        <View style={styles.messageContainer}>
          <Text
            style={[
              styles.msg_text,
              {color: id === 2 ? 'rgba(0,0,0,0.7)' : 'white'},
            ]}>
            {message}
          </Text>
        </View>
      </LinearGradient>

      {timestamp && <Text style={styles.time_text}>{timestamp}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
