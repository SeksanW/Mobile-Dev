import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  onChange?: (text: string) => void;
  value?: string;
}

export default function FormInput({
  onChange,
  value,
  ...props
}: FormInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChange} // ← 核心修复：onChange 映射到 onChangeText
      autoCapitalize="none" // ← 防止首字母大写
      autoCorrect={false} // ← 防止自动纠错
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});
