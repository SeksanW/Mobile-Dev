/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

Assignment: Advanced Form Development and Validation with React Hook Form and Zod

Purpose:
An account center screen that allows users to edit and save their profile information. 
The screen includes form validation using React Hook Form and Zod, 
and saves the data to AsyncStorage for persistence.
useEffect
*/

import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { useTheme } from "../components/ThemeContext";
import * as storage from "@/lib/storage";
import { useEffect } from "react";

const accountSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number is too long"),
    userName: z.string().min(5, "Username must be at least 5 characters"),
    accountBio: z.string()
                .min(1, "Bio is required")
                .min(2, "Bio must be at least 2 characters"),
});

type AccountFormData = z.infer<typeof accountSchema>;

export default function AccountCenterScreen() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // React Hook Form setup with Zod validation
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, touchedFields },
        reset,
    } = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            userName: "",
            accountBio: "",
        },
    });

    // Loads saved profile data from AsyncStorage.
    useEffect(() => {
        const loadData = async () => {
            const data = await storage.get<AccountFormData>(storage.STORAGE_KEY.PROFILE);
            if (data) {
                reset(data);
            }
        };

        loadData();
    }, [reset]);

    // Saves profile data when saved, shows a confirm popup when done.
    const onSubmit = async (data: AccountFormData) => {
        try {
            await storage.set(storage.STORAGE_KEY.PROFILE, data);

            if (Platform.OS === "web") {
                alert("Your information has been saved.");
            } 

            Alert.alert("Success", "Your information has been saved.", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } 
        
        catch (error) {
            console.error("Failed to save profile:", error);
            Alert.alert("Error", "Unable to save your information.");
        }
    };

return (
    <View
        style={[
            styles.container, 
            { backgroundColor: isDark ? "#1C1C1E" : "#fff" },
        ]}>

    <View
        style={[
            styles.header,
            { borderBottomColor: isDark ? "#1f2937" : "#e5e7eb" },
        ]}>

        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons
                name="chevron-back"
                size={28}
                color={isDark ? "#fff" : "#111827"}/>
        </TouchableOpacity>

        <Text
            style={[
                styles.headerTitle,
                { color: isDark ? "#fff" : "#111827" },
            ]}>
            Account
        </Text>
        <View style={styles.iconBtn} />
    </View>

    <ScrollView contentContainerStyle={styles.content}>
        <Text
            style={[
                styles.title,
                { color: isDark ? "#fff" : "#111827" },
            ]}>
            Account Information
        </Text>
        
        {/*Text input fields for full name, email, username, and account bio with validation errors displayed below each field.*/}
        <Text
            style={[
                styles.subtitle,
                { color: isDark ? "#9ca3af" : "#6b7280" },
            ]}>
            Edit your information below.
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
            name="phone"
            placeholder="Phone number"
            keyboardType="phone-pad"
            error={errors.phone?.message}
            isValid={!errors.phone && touchedFields.phone}
        />

        <FormInput
            control={control}
            name="userName"
            placeholder="Username"
            error={errors.userName?.message}
            isValid={!errors.userName && touchedFields.userName}
        />

        <FormInput
            control={control}
            name="accountBio"
            placeholder="Account Bio"
            error={errors.accountBio?.message}
            multiline={true}
            numberOfLines={4}
            isValid={!errors.accountBio && touchedFields.accountBio}
        />

        <TouchableOpacity
            style={[
                styles.saveBtn,
                { backgroundColor: isValid ? "#2563eb" : "#93c5fd" },
            ]}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}>

            <Text style={styles.saveText}>Save Information</Text>
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