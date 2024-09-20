import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
import {Alert} from 'react-native';

const pusher = Pusher.getInstance();

const initiatePusher = async () => {
  await pusher.init({
    apiKey: 'd16fc67de95520983419',
    cluster: 'ap2',
  });
  await pusher.connect();

  let myChannel = await pusher.subscribe({
    channelName: 'my-channel',
    onEvent: (event: PusherEvent) => {
      console.log(`onEvent: ${event}`);
    },
  });
};
