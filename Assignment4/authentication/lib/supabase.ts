import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage =
  Platform.OS === "web"
    ? undefined // ← Web 用默认的 localStorage
    : AsyncStorage; // ← 移动端用 AsyncStorage

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === "web", // ← Web 需要开启，移动端关闭
    },
  },
);
