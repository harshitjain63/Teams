import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../constants/Image';

const SendMessage = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [messageValue, setMessageValue] = useState('');
  const handleclick = () => {
    setMessage(prev => [...prev, messageValue]);
    setMessageValue('');
  };

  return (
    <View>
      <View style={styles.messageContainer}>
        <TextInput
          style={styles.msg_text}
          placeholder="Type Here"
          placeholderTextColor={'grey'}
          onChangeText={txt => setMessageValue(txt)}
          multiline={true}
          value={messageValue}
        />
        <TouchableOpacity
          style={styles.gradientProfile}
          onPress={() => handleclick()}>
          <Image style={styles.profile_pic} source={Images.arrowicon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  msg_text: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  gradientProfile: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profile_pic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default SendMessage;
