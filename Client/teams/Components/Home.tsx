
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { io } from 'socket.io-client';
import { RootStackParams } from '../Navigation/StackNavigator';
import { useFocusEffect } from '@react-navigation/native';

type HomeProps = NativeStackScreenProps<RootStackParams, 'Home'>

const Home = ({ navigation }: HomeProps) => {


    const socket = useMemo(() => {
        return io('http://192.168.146.209:3000', {
            reconnection: false,
        });
    }, []);

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected', socket.id);
        });

        socket.on('welcome', (s) => {
            console.log(s);
        });

        // return () => {
        //     socket.off('connect');
        //     socket.off('welcome');
        //     socket.disconnect();
        //     console.log('User has left');
        // };

    },[socket]);


    const handleSubmit = () => {
        socket.emit('message', message);
        setMessage('');
        navigation.navigate('testing');
    };

    console.log(message);

    return (
        <View style={styles.container}>
            <Text>hello</Text>
            <TextInput
                placeholder="Enter Your Message"
                value={message}
                onChangeText={setMessage}
            />
            <Button style={styles.btn} mode="contained" onPress={handleSubmit}>Send Messages</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    btn: {
        alignSelf: 'center',
        top: 20,
    },
});

export default Home;
