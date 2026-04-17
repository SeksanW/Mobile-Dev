import { useEffect } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

export default function Index() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/home");
      } else {
        router.replace("/sign-in");
      }
    });
  }, []);

  return <Text>Loading...</Text>;
}
