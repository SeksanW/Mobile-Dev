// Utility functions for AsyncStorage operations in React Native.
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = {
    PROFILE: "profile",
    NOTIFICATIONS: "notifications",
} as const;

export const get = async <T>(key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value) as T;
};

export const set = async <T>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const remove = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
};
