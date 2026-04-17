import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { supabase } from "../../lib/supabase";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're logged in 🎉</Text>

      <PrimaryButton title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});
