import { View, Text, StyleSheet, Button, Alert } from "react-native";

export default function FirstTest() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>It works 🎉</Text>
      <Button title="Alert" onPress={() => Alert.alert("Alert Button pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#000000",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
});
