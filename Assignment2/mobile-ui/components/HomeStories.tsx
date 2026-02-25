import React from "react";
import { View, StyleSheet } from "react-native";

const HomeStories = () => {
    return (
        <View style={styles.container}>
            <View style={styles.userPicture} />
            <View style={styles.userPicture} />
            <View style={styles.userPicture} />
            <View style={styles.userPicture} />
        </View>
    );
};

export default HomeStories;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8
    },
    userPicture: {
        width: 75,
        height: 75,
        backgroundColor: "#bbb",
        borderRadius: 50,
        marginRight: 8,
    }
});