import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Room} from '../../Screens/Home';

type RoomsProps = {
  rooms: Room[];
};

const Rooms = ({rooms}: RoomsProps) => {
  const renderItem = useCallback(({item}: {item: Room}) => {
    return (
      <TouchableOpacity style={styles.flatListItem} activeOpacity={0.8}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: item.image}} style={styles.Image} />
        </View>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  flatListItem: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    columnGap: 25,
  },
  imageWrapper: {
    height: 55,
    width: 55,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
});
