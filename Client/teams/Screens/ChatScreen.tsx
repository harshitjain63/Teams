import {StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SendMessage from '../Components/chatscreen/SendMessage';
import ChatView from '../Components/ChatView';
import {SafeAreaView} from 'react-native-safe-area-context';
import axiosInstance from '../middleware/axiosConfig/axiosConfig';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import {format} from 'date-fns';

type ItemData = {
  timestamp: string;
  id: number;
  message: string;
  sender_id: string;
  sender_name: string;
  receiver_id: string;
  receiver_name: string;
  created_at: string;
};

export type MeetingProps = NativeStackScreenProps<RootStackParams, 'Chat'>;

const ChatScreen = ({route}: MeetingProps) => {
  const [message, setMessage] = useState<ItemData[]>([]);
  const [reciever_Id, setReciever_Id] = useState('');

  const {flag, group_id} = route.params;

  console.log('group_id', group_id);
  console.log('recieverid', reciever_Id);

  useEffect(() => {
    if (route.params?.reciever_Id) {
      setReciever_Id(route.params.reciever_Id);
      console.log('reciever id------', reciever_Id);
    }
  }, [reciever_Id, route.params?.reciever_Id]);

  const getMessageData = async () => {
    try {
      if (flag === 'group') {
        const profile = await axiosInstance.get(`/group/${group_id}/messages`);
        const values = profile.data.data.data;
        console.log(profile.data, '');
        console.log('values', values);

        if (values) {
          const msgData = values.map(
            (item: {message: string; user_id: string; created_at: string}) => ({
              message: item.message,
              id: item.user_id === id ? 1 : 2,
              timestamp: item.created_at,
            }),
          );

          msgData.sort(
            (
              a: {timestamp: string | number | Date},
              b: {timestamp: string | number | Date},
            ) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
          );

          setMessage(msgData);
        }
      }
      const profile = await axiosInstance.get('/user/profile');
      const id = profile.data.data.id;
      const response = await axiosInstance.get(`/message/${reciever_Id}`);

      if (response.data.status && response.data.data) {
        const msgData = response.data.data.map(
          (item: {
            message: string;
            sender_id: string;
            receiver_id: string;
            created_at: string;
          }) => ({
            message: item.message,
            id: item.sender_id === id ? 1 : 2, // 1 for current user (sender), 2 for receiver
            timestamp: item.created_at,
          }),
        );

        msgData.sort(
          (
            a: {timestamp: string | number | Date},
            b: {timestamp: string | number | Date},
          ) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );

        setMessage(msgData);
      }
    } catch (error) {
      console.log((error as any).message);
    }
  };

  useEffect(() => {
    if (reciever_Id) {
      getMessageData(); // Fetch messages when receiverId is set
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reciever_Id]);

  const renderItem = useCallback(({item}: {item: ItemData}) => {
    const date = new Date(item.timestamp);
    const formattedTimestamp = !isNaN(date.getTime())
      ? format(date, 'hh:mm a')
      : 'Invalid time';
    return (
      <ChatView
        message={item.message}
        id={item.id}
        timestamp={formattedTimestamp}
      />
    );
  }, []);

  console.log(message);

  return (
    <SafeAreaView style={styles.container}>
      {message.length !== 0 ? (
        <FlatList
          data={message}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : null}
      <SendMessage
        setMessage={setMessage}
        reciever_Id={reciever_Id}
        flag={flag}
      />
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
