import {StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import React from 'react';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};

const SearchBar = ({searchQuery, setSearchQuery}: SearchBarProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <FontAwesome name={'search'} size={20} color={'#fff'} />
      <TextInput
        placeholder="Search"
        style={styles.text}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholderTextColor="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    width: '90%',
  },
});

export default SearchBar;
