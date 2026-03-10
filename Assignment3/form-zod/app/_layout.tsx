import { Stack } from "expo-router";
import { ThemeProvider } from "../components/ThemeContext";

export default function RootLayout() {
    return (
    <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="settings"
                options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
                name="account-center"
                options={{ animation: "slide_from_bottom" }}
            />
        </Stack>
    </ThemeProvider>
    );
}