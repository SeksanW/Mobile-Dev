/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

Assignment: Advanced Form Development and Validation with React Hook Form and Zod

Purpose:
An sign up screen that allows users to sign up. 
The screen includes form validation using React Hook Form and Zod, 
useEffect
*/

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput";
import { useTheme } from "../../components/ThemeContext";
import * as storage from "@/lib/storage";
import { useEffect } from "react";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // React Hook Form setup with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Shows a confirm popup when done.
  const onSubmit = async (data: SignUpFormData) => {
    try {
      await storage.set(storage.STORAGE_KEY.PROFILE, {
        ...data,
        confirmPassword: "",
      });

      if (Platform.OS === "web") {
        alert("Signup successful!");
      }

      Alert.alert("Success", "Signup successful!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Failed to signup:", error);
      Alert.alert("Error", "Unable to signup.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1C1C1E" : "#fff" },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: isDark ? "#1f2937" : "#e5e7eb" },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={isDark ? "#fff" : "#111827"}
          />
        </TouchableOpacity>

        <Text
          style={[styles.headerTitle, { color: isDark ? "#fff" : "#111827" }]}
        >
          Sign Up
        </Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111827" }]}>
          Account Information
        </Text>

        {/*Text input fields for full name, email, username, and account bio with validation errors displayed below each field.*/}
        <Text
          style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6b7280" }]}
        >
          Input your information below.
        </Text>

        <FormInput
          control={control}
          name="fullName"
          placeholder="Full name"
          error={errors.fullName?.message}
          isValid={!errors.fullName && touchedFields.fullName}
        />

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

        <FormInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry={true}
          error={errors.confirmPassword?.message}
          isValid={!errors.confirmPassword && touchedFields.confirmPassword}
        />

        <TouchableOpacity
          style={[
            styles.saveBtn,
            { backgroundColor: isValid ? "#2563eb" : "#93c5fd" },
          ]}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.saveText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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
});
