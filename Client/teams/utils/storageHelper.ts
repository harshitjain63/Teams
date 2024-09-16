import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from '../models/bookScehma';

// Saving the room list to AsyncStorage
export const saveRoomsToStorage = async (rooms: string[]) => {
  try {
    await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
  } catch (e) {
    console.error('Error saving rooms to storage', e);
  }
};

// Loading the room list from AsyncStorage
export const loadRoomsFromStorage = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('rooms');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading rooms from storage', e);
    return [];
  }
};

// Saving messages for a specific room
export const saveMessagesForRoom = async (
  room: string,
  messages: Message[],
) => {
  try {
    const jsonValue = JSON.stringify(messages);
    await AsyncStorage.setItem(`conversationHistory_${room}`, jsonValue);
  } catch (e) {
    console.error('Error saving messages for room to storage', e);
  }
};

// Loading messages for a specific room
export const loadMessagesForRoom = async (room: string): Promise<Message[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`conversationHistory_${room}`);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading messages for room from storage', e);
    return [];
  }
};
