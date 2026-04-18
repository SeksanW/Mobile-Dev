import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthForm } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthForm) => {
    const emailRedirectTo = Linking.createURL("auth/callback");

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { emailRedirectTo },
    });

    if (error) {
      alert(error.message);
    } else {
      // Optional: Supabase may require email confirmation
      alert("Check your email to confirm your account");
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => <FormInput placeholder="Email" {...field} />}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password */}
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

      {/* Button */}
      {isSubmitting ? (
        <ActivityIndicator />
      ) : (
        <PrimaryButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
      )}

      {/* Link to Sign In */}
      <Text style={styles.link} onPress={() => router.push("/(auth)/sign-in")}>
        Already have an account? Sign in
      </Text>
    </View>
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
    textAlign: "center",
  },
});
