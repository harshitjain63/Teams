import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import Header from '../Components/Home/Header';
import SearchBar from '../Components/Home/SearchBar';
import Rooms from '../Components/Home/Rooms';
import useDebounce from '../hooks/useDebounce';
import {View} from 'react-native';
// import {loadRoomsFromStorage} from '../utils/storageHelper';
export type HomeProps = NativeStackScreenProps<RootStackParams, 'Home'>;

export type Room = {
  id: number;
  name: string;
  image: string;
};

const roomsData = [
  {
    id: 1,
    name: 'Room 1',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Room 2',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'Room 3',
    image: 'https://picsum.photos/200/300',
  },
];

const Home = ({navigation, route}: HomeProps) => {
  // const [rooms, setRooms] = React.useState<Room[]>(roomsData);
  const [searchQuery, setSearchQuery] = React.useState('');

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  // const initializeRooms = async () => {
  //   const storedRooms = await loadRoomsFromStorage();
  //   setRooms(storedRooms);
  // };

  // initializeRooms();

  const filteredRooms = roomsData.filter(room =>
    room.name
      .trim()
      .toLowerCase()
      .includes(debounceSearchQuery.toLowerCase().trim()),
  );

  return (
    <View>
      <Header navigation={navigation} route={route} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Rooms rooms={filteredRooms} />
    </View>
  );
};

export default Home;
