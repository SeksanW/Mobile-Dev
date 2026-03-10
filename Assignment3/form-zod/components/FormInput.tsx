/*
FormInput Component

Purpose:
Component for text input fields across pages. It connects
react hook form with react natives textinput:

Form validation display (red error border)
Valid input feedback (green border)
Dark/light mode styling (Does not need, do it if you'd like)
Error messages under the field
Support for password fields and multiline inputs

How to use:
1. Import the component in your form page.
    import FormInput from "@/components/FormInput";
2. Make sure your page is using React Hook Form:

const {
    control,
    handleSubmit,
    formState: { errors, touchedFields }
} = useForm<FormType>();

3. Use FormInput for each field in your form:
<FormInput
    control={control}
    name="email"
    placeholder="Email"
    keyboardType="email-address"
    error={errors.email?.message}
    isValid={!errors.email && !!touchedFields.email}
/>

Required:
control  - from useForm()
name     - field name from your form type
placeholder - text shown inside the input

AIM:
error - validation message from React Hook Form
isValid - turns border green when input passes validation
secureTextEntry - used for password fields
keyboardType - email / numeric / phone-pad
multiline - allows larger text fields
numberOfLines - number of lines for multiline inputs

NOTE!!!!!!:
DONT MAKE new TextInput fields in pages. Always use this component so
all forms in the app stay consistent and share the same validation styling.
*/
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

type Props<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    placeholder: string;
    error?: string;
    isValid?: boolean;
    secureTextEntry?: boolean;
    keyboardType?:
        | "default"
        | "email-address"
        | "numeric"
        | "phone-pad";
    multiline?: boolean;
    numberOfLines?: number;
};

export default function FormInput<T extends FieldValues>({
    control,
    name,
    placeholder,
    error,
    isValid = false,
    secureTextEntry = false,
    keyboardType = "default",
    multiline = false,
    numberOfLines = 1,
}: Props<T>) {

    const { theme } = useTheme();
    const isDark = theme === "dark";

return (
    <View style={styles.wrapper}>
        <Controller
            control={control}
            name={name}

            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multilineInput,
                    {
                        backgroundColor: isDark ? "#2A2A2C" : "#fff",
                        color: isDark ? "#fff" : "#111827",
                        borderColor: error ? "#ef4444" : isValid ?  "#10b981" : isDark ? "#374151" : "#d1d5db",
                    },
                ]}
                placeholder={placeholder}
                placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                value={value ? String(value) : ""}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? "top" : "center"}
            />
            )}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null} 
    </View>);
}

const styles = StyleSheet.create({
wrapper: {
    marginBottom: 14,
},

input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
},

multilineInput: {
    minHeight: 80,
    paddingTop: 12,
},  

errorText: {
    marginTop: 6,
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "500",
},
});