import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedFAB, Button} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import TextInputWrapper from '../Components/MeetingScreen/TextInputWrapper';

export type MeetingProps = NativeStackScreenProps<
  RootStackParams,
  'MeetingScreen'
>;

const MeetingScreen = ({navigation, route}: MeetingProps) => {
  const [reciever_Id, setReciever_Id] = useState('');
  useEffect(() => {
    if (route.params?.reciever_Id) {
      setReciever_Id(route.params.reciever_Id);
    }
  }, [route.params?.reciever_Id]);
  const handleFabClick = () => {
    showModal();
  };

  const showModal = () => {
    navigation.navigate('Search_Modal');
  };
  return (
    <View style={styles.container}>
      <TextInputWrapper reciever_id={reciever_Id} />
      <Button style={styles.button} textColor="#FFF">
        Start Meeting
      </Button>
      <AnimatedFAB
        label="Add Receiver"
        icon={'plus'}
        extended={false}
        onPress={handleFabClick}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />
    </View>
  );
};

export default MeetingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  textInputWrapper: {
    width: '90%',
    rowGap: 10,
    padding: 10,
    alignSelf: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4c2fdc',
    width: '80%',
    alignSelf: 'center',
  },
  outlineStyle: {borderRadius: 12},
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 30,
  },
});
