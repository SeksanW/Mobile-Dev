import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthForm } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";

export default function SignIn() {
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({ resolver: zodResolver(authSchema), defaultValues: { email: "", password: "" } });

  const onSubmit = async (data: AuthForm) => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) setAuthError(error.message);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Welcome Back</Text>

      <Controller
        control={control}
        name="email"
        render={({ field }) => <FormInput placeholder="Email" {...field} />}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormInput placeholder="Password" secureTextEntry {...field} />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {authError && <Text style={styles.error}>{authError}</Text>}

      {isSubmitting ? (
        <ActivityIndicator />
      ) : (
        <PrimaryButton title="Sign In" onPress={handleSubmit(onSubmit)} />
      )}

      <Text style={styles.link} onPress={() => router.push("/(auth)/sign-up")}>
        Create account
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  link: {
    marginTop: 16,
    color: "#4F46E5",
  },
});
