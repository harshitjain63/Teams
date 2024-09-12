import React, { useState, useEffect } from 'react';
import {  Text, TextInput, Button } from 'react-native-paper';
import { FlatList , View } from 'react-native';
import io, { Socket } from 'socket.io-client';

interface Message {
    room?: string;
    username: string;
    text: string;
}

interface RoomEvent {
    text: string;
}



const socket: Socket = io('https://teams-psi.vercel.app/'); // Your server URL

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [room, setRoom] = useState<string>('');
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
        return () => {
            socket.off('message');
            socket.off('user-joined');
            socket.off('user-left');
            socket.off('current-users');
        };
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

    return (
        <View>
            <TextInput placeholder="Room" value={room} onChangeText={setRoom} />
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <Button mode="contained" onPress={joinRoom} >Join Room</Button>
            <Button mode="contained" onPress={leaveRoom} >leaveRoom</Button>
            <TextInput placeholder="Message" value={message} onChangeText={setMessage} />
            <Button mode="contained" onPress={sendMessage} >sendMessage</Button>

            {/* Display messages */}
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <Text>{item.username ? item.username : item.text}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Display current users in the room */}
            <Text>Current Users in Room:</Text>
            {roomUsers.map((user, index) => (
                <Text key={index}>{user}</Text>
            ))}
        </View>
    );
};



export default Home;
