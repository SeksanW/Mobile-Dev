/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

ASSIGNMENT:
Assignment: Advanced Multi-Screen Mobile Application with Collaborative Navigation 

Purpose:
chat conversation component that represents the individual messaging screen.
*/
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

type ChatMsg = { id: string; text: string; fromMe: boolean };

export default function ChatScreen({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    { id: "m1", text: `Hey! This is chat ${chatId}`, fromMe: false },
    { id: "m2", text: "Yo what’s up", fromMe: true },
  ]);

  const data = useMemo(() => messages, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, text, fromMe: true },
    ]);
    setInput("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.fromMe ? styles.bubbleMe : styles.bubbleThem,
            ]}>

            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}/>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Message..."
          style={styles.input}/>
        <TouchableOpacity onPress={send} style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 28, fontWeight: "600" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700" },

  listContent: { padding: 12, gap: 8 },

  bubble: {
    maxWidth: "78%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  bubbleMe: { alignSelf: "flex-end", backgroundColor: "#DCF8C6" },
  bubbleThem: { alignSelf: "flex-start", backgroundColor: "#F2F2F2" },
  bubbleText: { fontSize: 15 },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendBtn: { paddingHorizontal: 12, paddingVertical: 10 },
  sendText: { fontWeight: "700" },
});