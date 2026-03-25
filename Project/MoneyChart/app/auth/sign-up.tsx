import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { saveUser } from '../../lib/storage';

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  async function handleSignUp() {
    setError('');
    if (!firstName || !lastName || !email || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    await saveUser({ firstName, lastName, email, password });
    router.replace('/auth/sign-in');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.appTitle}>Money Chart</Text>
        <Text style={styles.appSubtitle}>Start manage your expenses today</Text>

        <Text style={styles.formTitle}>Create Account</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#aaa"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#aaa"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#aaa"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
  },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  appSubtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  formTitle: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  error: { color: '#e53e3e', marginBottom: 12, fontSize: 14, textAlign: 'center' },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
    color: '#000',
  },
  button: {
    width: '100%', backgroundColor: '#3366FF', borderRadius: 30,
    paddingVertical: 16, alignItems: 'center', marginBottom: 20, marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row' },
  footerText: { color: '#333', fontSize: 14 },
  link: { color: '#3366FF', fontSize: 14, fontWeight: '600' },
});
