import React, {useState, useEffect} from 'react';
import {Text, TextInput, Button, Card, Title} from 'react-native-paper';
import {FlatList, View, StyleSheet, ScrollView, Alert} from 'react-native';
import io, {Socket} from 'socket.io-client';
import {
  saveRoomsToStorage,
  loadRoomsFromStorage,
  saveMessagesForRoom,
  loadMessagesForRoom,
} from '../utils/storageHelper';
import {Message} from '../models/messageSchema';

const socket: Socket = io('https://teams-iauq.onrender.com/');

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('User1');
  const [roomUsers, setRoomUsers] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [joined, setJoined] = useState<boolean>(false);

  useEffect(() => {
    const initializeRooms = async () => {
      const storedRooms = await loadRoomsFromStorage();
      setRooms(storedRooms);
    };

    initializeRooms();

    socket.on('message', (msg: Message) => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, msg];
        saveMessagesForRoom(room, updatedMessages);
        return updatedMessages;
      });
    });

    socket.on('user-joined', (msg: string) => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, {username: '', text: msg}];
        // saveMessagesForRoom(room, updatedMessages);
        return updatedMessages;
      });
    });

    socket.on('user-left', (msg: string) => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, {username: '', text: msg}];
        socket.off('message');
        return updatedMessages;
      });
    });

    socket.on('current-users', (users: string[]) => {
      setRoomUsers(users);
    });

    return () => {
      socket.off('message');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('current-users');
    };
  }, [room]);

  const joinRoom = async () => {
    if (room) {
      socket.emit('join-room', room, username);
      setJoined(true);
      if (!rooms.includes(room)) {
        const updatedRooms = [...rooms, room];
        setRooms(updatedRooms);
        await saveRoomsToStorage(updatedRooms);
      }

      const roomMessages = await loadMessagesForRoom(room);
      setMessages(roomMessages);
    }
  };

  const leaveRoom = () => {
    if (room) {
      socket.emit('leave-room', room, username);
      setJoined(false);
      socket.off('message');
      setRoom('');
    }
  };

  const sendMessage = () => {
    if (message && joined) {
      // Ensure the user is joined to a room
      const msg: Message = {room, username, text: message};
      socket.emit('message', msg);
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, msg];
        saveMessagesForRoom(room, updatedMessages);
        return updatedMessages;
      });
      setMessage('');
    } else {
      Alert.alert('You need to join a room to send a message.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Room"
          value={room}
          onChangeText={setRoom}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.buttonContainer}>
          {joined ? (
            <Button mode="contained" onPress={leaveRoom} style={styles.button}>
              Leave Room
            </Button>
          ) : (
            <Button mode="contained" onPress={joinRoom} style={styles.button}>
              Join Room
            </Button>
          )}
        </View>
        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
        />
        <Button mode="contained" onPress={sendMessage} style={styles.button}>
          Send Message
        </Button>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Previously Used Rooms</Title>
          {rooms.map((roomName, index) => (
            <Button
              key={index}
              onPress={() => loadMessagesForRoom(roomName).then(setMessages)}>
              {roomName}
            </Button>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Messages</Title>
          <FlatList
            data={messages}
            renderItem={({item}) => (
              <View style={styles.render}>
                <Text style={styles.messageText}>
                  {item.username
                    ? `${item.username}: ${item.text.toString()}`
                    : item.text.toString()}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Current Users in Room:</Title>
          {roomUsers.map((user, index) => (
            <View style={styles.render} key={index}>
              <Text style={styles.userText}>{user}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    marginVertical: 10,
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  userText: {
    fontSize: 16,
    color: '#666',
  },
  render: {
    borderWidth: 1,
    padding: 7,
    margin: 7,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default Home;
