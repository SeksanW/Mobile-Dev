/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

Assignment: Advanced Multi-Screen Mobile Application with Collaborative Navigation 

Purpose:
stack navigation flow
*/
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface Props {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
}

export default function MessageBox({
  id,
  name,
  lastMessage,
  time,
  avatar,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
    router.push({
    pathname: "/chat/[id]",
    params: { id: String(id), name },
  })
}
    >
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>

      <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
});