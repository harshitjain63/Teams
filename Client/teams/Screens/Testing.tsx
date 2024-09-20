import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';

// type ItemData = {
//   id: number;
//   message: string;
// };

const Testing = () => {
  //   const [messageList, setMessageList] = useState<ItemData[]>([]);
  const pusher = Pusher.getInstance();
  const initiatePusher = async () => {
    await pusher.init({
      apiKey: 'd16fc67de95520983419',
      cluster: 'ap2',
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: 'teams-chat-channel',
      onSubscriptionSucceeded: (data: any) => {
        console.log('Subscription successful');
      },
      onEvent: (event: PusherEvent) => {
        console.log('Received event:', event);
        console.log(`Event name: ${event.eventName}`);
        console.log(`Event data: ${event.data}`);
      },
      onSubscriptionError: (error: any) => {
        console.log('Subscription error:', error);
      },
    });
  };

  useEffect(() => {
    // Initialize Pusher
    initiatePusher();
  }, []);

  return (
    <View>
      <Text>testing</Text>
    </View>
  );
};

export default Testing;
