import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Icon} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../Navigation/StackNavigator';
import useDebounce from '../../hooks/useDebounce';
// import axios from 'axios';
import {FlatList} from 'react-native';

type SearchProps = NativeStackScreenProps<RootStackParams, 'Search_Modal'>;

type item = {
  id: string;
  name: string;
  email: string;
};

const itemData: item[] = [
  {
    id: 'sdhjagvhkbjkABFSJHbadjh',
    name: 'Aarjav',
    email: 'anshjain638@gmail.com',
  },
  {
    id: 'sdhdbfhjagvhkbjkABFSJHbadjh',
    name: 'Aarjav3',
    email: 'anshjain638@gmail.com',
  },
  {
    id: 'sdhjagvhkfdjsbbjkABFSJHbadjh',
    name: 'Aarjav2',
    email: 'anshjain638@gmail.com',
  },
  {
    id: 'sdhjagvhkbjkABcdFSJHbadjh',
    name: 'Aarjav1',
    email: 'anshjain638@gmail.com',
  },
];

const Modal = ({navigation}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<item[]>(itemData);

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  const filteredData = useCallback(() => {
    return data.filter(
      item =>
        item.email
          .toLowerCase()
          .trim()
          .includes(debounceSearchQuery.toLowerCase().trim()) ||
        item.name
          .toLowerCase()
          .trim()
          .includes(debounceSearchQuery.toLowerCase().trim()),
    );
  }, [data, debounceSearchQuery]);

  const handleItemOnPress = ({id}: {id: string}) => {
    navigation.navigate('MeetingScreen', {reciever_Id: id});
  };

  const renderItem = ({item}: {item: item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.flatListItem}
        onPress={() => handleItemOnPress({id: item.id})}>
        <Text>{item.id}</Text>
        <Text>{item.email}</Text>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon source={'arrow-left'} size={25} color="blue" />
        </Pressable>
        <Text style={styles.headerText}>Search User</Text>
      </View>

      <TextInput
        style={styles.textInput}
        onChangeText={text => setSearchQuery(text)}
      />
      {data && (
        <FlatList
          data={filteredData()}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '12%',
    borderTopEndRadius: 15,
    backgroundColor: '#fff',
    borderTopStartRadius: 15,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    position: 'relative',
    left: '35%',
    fontSize: 16,
    color: 'blue',
  },
  textInput: {
    width: '90%',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#1c1c1c',
    color: '#fff',
    marginVertical: 20,
  },
  flatListItem: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
