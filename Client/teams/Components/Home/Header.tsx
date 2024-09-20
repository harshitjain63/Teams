import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HomeProps} from '../../Screens/Home';

type Item = {
  id: number;
  name: string;
  title: string;
  navigateTo: 'MeetingScreen' | 'Home' | 'Profile';
};

const items: Item[] = [
  {
    id: 1,
    name: 'video-camera',
    title: 'New Meeting',
    navigateTo: 'MeetingScreen',
  },
  {
    id: 2,
    name: 'plus-square',
    title: 'Join Meeting',
    navigateTo: 'MeetingScreen',
  },
  {
    id: 3,
    name: 'calendar',
    title: 'Schedule',
    navigateTo: 'MeetingScreen',
  },
  {
    id: 4,
    name: 'arrow-up',
    title: 'Profile',
    navigateTo: 'Profile',
  },
];

const Header = ({navigation}: HomeProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View style={styles.wrapper} key={index}>
          <TouchableOpacity
            key={item.id}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.iconButton,
              backgroundColor: item.id === 1 ? '#ff9523' : '#4c2fdc',
            }}
            onPress={() => navigation.navigate(item.navigateTo)}>
            <FontAwesome name={item.name} size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    rowGap: 5,
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
});
