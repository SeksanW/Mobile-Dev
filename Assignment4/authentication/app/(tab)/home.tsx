import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're logged in</Text>
      {email && <Text style={styles.email}>{email}</Text>}
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
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
});
