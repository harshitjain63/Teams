import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import axiosInstance from '../middleware/axiosConfig/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputWrapper from '../Components/MeetingScreen/TextInputWrapper';

export type GroupProps = NativeStackScreenProps<RootStackParams, 'Testing'>;

const Testing = ({navigation, route}: GroupProps) => {
  const [reciever_Id, setReciever_Id] = useState('');

  useEffect(() => {
    if (route.params?.reciever_Id) {
      setReciever_Id(route.params.reciever_Id);
      console.log('reciever id------', route.params.reciever_Id);
    }
  }, [route.params?.reciever_Id]);

  const [groupname, setGroupName] = useState<string>('');
  const [grouparray, setGroupArray] = useState<{id: string; name: string}[]>(
    [],
  );
  const [groupId, setGroupId] = useState('');

  const storeData = async (data: {id: string; name: string}[]) => {
    try {
      const serializedData = JSON.stringify(data);
      await AsyncStorage.setItem('group_data', serializedData);
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('group_data');
      if (value !== null) {
        const storedGroups = JSON.parse(value);
        setGroupArray(storedGroups);
      }
    } catch (err) {
      console.log((err as any).message);
    }
  };

  const createGroup = async () => {
    try {
      const response = await axiosInstance.post('/group/create', {
        name: groupname,
      });
      const {id, name} = response.data.data;
      console.log('response_group', {id, name});

      const newGroup = {id, name};
      const updatedGroups = [...grouparray, newGroup];
      setGroupArray(updatedGroups);
      await storeData(updatedGroups);
    } catch (error) {
      console.log((error as any).message);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const addUser = async () => {
    try {
      const response = await axiosInstance.post('/group/addUser', {
        user_id: reciever_Id,
        group_id: groupId,
      });

      if (response.data) {
        navigation.navigate('Chat', {
          flag: 'group',
          reciever_Id: reciever_Id,
          group_id: groupId,
        });
      }
    } catch (error) {
      console.log((error as any).message);
    } finally {
      navigation.navigate('Chat', {
        flag: 'group',
        reciever_Id: reciever_Id,
        group_id: groupId,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Create A Group</Text>
      <TextInput
        label={'Enter a Group Name'}
        mode="outlined"
        outlineColor="blue"
        activeOutlineColor="blue"
        outlineStyle={styles.outlineStyle}
        value={groupname}
        onChangeText={text => {
          setGroupName(text);
        }}
      />
      <Button
        style={styles.button}
        textColor="#FFF"
        onPress={() => createGroup()}>
        Create Group
      </Button>

      {reciever_Id.length ? (
        <View>
          <TextInputWrapper reciever_id={reciever_Id} />
          <Button style={styles.btn} textColor="#FFF" onPress={() => addUser()}>
            Add Person
          </Button>
        </View>
      ) : null}

      <View>
        {grouparray.map((group, index) => (
          <View key={group.id} style={styles.groupContainer}>
            <Text style={styles.groupText}>
              {index + 1}. Group Name: {group.name}
            </Text>
            <Button
              mode="contained"
              style={styles.btn}
              onPress={() => {
                setGroupId(group.id); // Set the group ID first
                navigation.navigate('GroupModal'); // Then navigate to GroupModal
              }}>
              Invite
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 5,
  },
  txt: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
  outlineStyle: {borderRadius: 12},
  button: {
    marginTop: 10,
    backgroundColor: '#4c2fdc',
    width: '80%',
    alignSelf: 'center',
  },
  groupText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
    marginTop: 30,
  },
  groupContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#4c2fdc',
    width: '30%',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default Testing;
