import {StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import SendMessage from '../Components/chatscreen/SendMessage';
import ChatView from '../Components/ChatView';
import {SafeAreaView} from 'react-native-safe-area-context';

const itemdata: ItemData[] = [
  {
    id: 1,
    message: 'i am sender',
  },
  {
    id: 2,
    message: 'i am reciever',
  },
  {
    id: 1,
    message: 'i am sender',
  },
  {
    id: 2,
    message: 'i am reciever',
  },
  {
    id: 2,
    message: 'i am reciever',
  },
  {
    id: 2,
    message: 'i am reciever',
  },
  {
    id: 1,
    message: 'i am sender',
  },
  {
    id: 2,
    message: 'i am reciever',
  },
];

type ItemData = {
  id: number;
  message: string;
};

const ChatScreen = () => {
  const [message, setMessage] = useState<string[]>([]);
  const renderItem = useCallback(({item}: {item: ItemData}) => {
    return <ChatView message={item.message} id={item.id} />;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {itemdata.length !== 0 ? (
        <FlatList
          data={itemdata}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : null}
      <SendMessage setMessage={setMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default ChatScreen;
