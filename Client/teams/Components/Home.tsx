import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, Card, Title } from 'react-native-paper';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import io, { Socket } from 'socket.io-client';

interface Message {
    room?: string;
    username: string;
    text: string;
}

interface RoomEvent {
    text: string;
}

const socket: Socket = io('https://teams-iauq.onrender.com/'); // Your server URL

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [room, setRoom] = useState<string>('');
    const [finalRoom , setFinalRoom] = useState<string>('');
    const [username, setUsername] = useState<string>('User1');
    const [roomUsers, setRoomUsers] = useState<string[]>([]);

    useEffect(() => {
        // Handle incoming messages
        socket.on('message', (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Handle notifications when a user joins
        socket.on('user-joined', (msg: RoomEvent) => {
            setMessages((prevMessages) => [...prevMessages, { username: '', text: msg.text }]);
        });

        // Handle notifications when a user leaves
        socket.on('user-left', (msg: RoomEvent) => {
            setMessages((prevMessages) => [...prevMessages, { username: '', text: msg.text }]);
        });

        // Handle current users in the room
        socket.on('current-users', (users: string[]) => {
            setRoomUsers(users);
        });


        // Clean up the event listeners on component unmount
        // return () => {
        //     socket.off('message');
        //     socket.off('user-joined');
        //     socket.off('user-left');
        //     socket.off('current-users');
        // };
    }, []);

    // Join a room
    const joinRoom = () => {
        if (room) {
            socket.emit('join-room', room, username);
        }
    };

    // Leave a room
    const leaveRoom = () => {
        if (room) {
            socket.emit('leave-room', room, username);
        }
    };

    // Send a message to the room
    const sendMessage = () => {
        if (message) {
            const msg: Message = { room, username, text: message };
            socket.emit('message', msg);
            setMessage('');
        }
    };

    console.log(roomUsers);
    console.log(messages);

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
                    <Button mode="contained" onPress={joinRoom} style={styles.button}>
                        Join Room
                    </Button>
                    <Button mode="contained" onPress={leaveRoom} style={styles.button}>
                        Leave Room
                    </Button>
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
                    <Title>Messages</Title>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <View style={styles.render}>
                            <Text style={styles.messageText}>
                                {item.username ? `${item.username}: ${item.text}` : item.text}
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
                        <View style={styles.render}>
                        <Text key={index} style={styles.userText}>{user}</Text>
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
    render:{
        borderWidth:1,
        padding:7,
        margin:7,
        borderRadius:10,
        fontSize:16
    },
});

export default Home;
