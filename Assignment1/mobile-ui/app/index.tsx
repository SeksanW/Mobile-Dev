import { View, StyleSheet } from "react-native";
import FirstTest from "../components/FirstTest";

export default function Index() {
    return (
        <View style={styles.container}>
            <FirstTest />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "dodgerblue",
    },
});
