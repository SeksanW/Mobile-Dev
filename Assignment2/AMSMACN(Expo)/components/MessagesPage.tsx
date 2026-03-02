/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

Assignment: Advanced Multi-Screen Mobile Application with Collaborative Navigation 

Purpose:
A messages page component that displays a list of chat conversations. The component is designed to be displayed when the "messages" tab is selected in the bottom navigation.
*/
import { View, Text, StyleSheet, FlatList } from "react-native";
import MessageBox from "./MessageBox";

const chats = [
  {
    id: 1,
    name: "CHEESE",
    lastMessage: "4 new messages",
    time: "3d",
    avatar:
      "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",
  },
  {
    id: 2,
    name: "Isnikola",
    lastMessage: "Active 6h ago",
    time: "",
    avatar:
      "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",
  },
  {
    id: 3,
    name: "Sleepdeprivedloser",
    lastMessage: "Active 1h ago",
    time: "",
    avatar:
      "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",
  },
];

export default function MessagesPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>asian_guy_nyi</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MessageBox
            id={item.id}
            name={item.name}
            lastMessage={item.lastMessage}
            time={item.time}
            avatar={item.avatar}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    paddingVertical: 12,
  },
});