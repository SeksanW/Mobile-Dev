import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { useTheme } from "../components/ThemeContext";
import * as storage from "@/lib/storage";


const signInSchema = zod.object({
  email: zod.string().min(1, "Email is required").email("Enter a valid email"),
  password: zod.string().min(8, "Password must be at least 8 characters"),
});

type SignInData = zod.infer<typeof signInSchema>;

export default function SignIn({ onSuccess }: { onSuccess?: (token: string) => void }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange", // match sign-up behavior so validation state updates consistently
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignInData) {
    try {
      const res = await signInApi(values);
      onSuccess?.(res.token);

      // Immediately route into index.tsx on success
      try {
        router.replace("/(tabs)/index");
      } catch {
        router.back();
      }

      // keep a small web alert but do not block navigation
      if (Platform.OS === "web") {
        alert("Sign in successful!");
      }

      Alert.alert("Success", "Signed in successfully", [
        {
          text: "OK",
          onPress: () => {
            try {
            //   router.replace("/"); // doesnt work 
            } catch {
              router.back();
            }
          },
        },
      ]);
    } catch (err: any) {
      setError("root", { type: "server", message: err?.message ?? "Sign-in failed" });
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#1C1C1E" : "#fff" }]}>
      <View style={[styles.header, { borderBottomColor: isDark ? "#1f2937" : "#e5e7eb" }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={28} color={isDark ? "#fff" : "#111827"} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#111827" }]}>Sign In</Text>
        <View style={styles.iconBtn} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, { color: isDark ? "#fff" : "#111827" }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}>
            Enter your credentials to continue.
          </Text>

          {/* server / root error */}
          <Text style={styles.serverError}>{(errors as any).root?.message ?? ""}</Text>

          <FormInput
            control={control}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            error={errors.email?.message}
            isValid={!errors.email && touchedFields.email}
          />

          <FormInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            error={errors.password?.message}
            isValid={!errors.password && touchedFields.password}
          />

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: isValid ? "#2563eb" : "#93c5fd" }]}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.saveText}>Sign In</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* Sign-in implementation that mirrors sign-up storage usage */
async function signInApi(values: SignInData) {
  // small delay to simulate async I/O
  await new Promise((r) => setTimeout(r, 600));

  const profile = await storage.get<{ fullName?: string; email?: string; password?: string }>(
    storage.STORAGE_KEY.PROFILE
  );

  if (!profile) {
    throw new Error("No account found. Please sign up first.");
  }

  if (profile.email !== values.email || profile.password !== values.password) {
    throw new Error("Invalid email or password");
  }

  // return a simple token and profile (adapt as needed)
  return { token: "local-token", profile };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    minHeight: 56,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  iconBtn: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    marginBottom: 18,
  },

  saveBtn: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  serverError: {
    color: "#B00020",
    textAlign: "center",
    marginBottom: 8,
  },
});