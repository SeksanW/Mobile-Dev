import { Tabs } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    const avatarUri =
    "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg";

return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
            name="index"
            options={{
            title: "Home",
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />),
            }}/>

        <Tabs.Screen
            name="reels"
            options={{
            title: "Reels",
            tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
                name={focused ? "play-circle" : "play-circle-outline"} size={size} color={color}/>),
            }}/>

        <Tabs.Screen
            name="message"
            options={{
            title: "Messages",
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={size} color={color} />),
            }}/>

        <Tabs.Screen
            name="search"
            options={{
            title: "Search",
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />),
            }}/>

        <Tabs.Screen
            name="profile"
            options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
                <Image source={{ uri: avatarUri }}
                    style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: focused ? 2 : 0,
                }}/>),
            }}/>
    </Tabs>
);
}