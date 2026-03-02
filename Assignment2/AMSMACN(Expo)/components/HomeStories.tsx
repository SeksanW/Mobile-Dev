import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

const HomeStories = () => {
    const stories = [
        {
            id: 1,
            profilePicture: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg"
        },
        {
            id: 2,
            profilePicture: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg"
        },
        {
            id: 3,
            profilePicture: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg"
        },
        {
            id: 4,
            profilePicture: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg"
        },
        {
            id: 5,
            profilePicture: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg"
        },
        {
            id: 6,
            profilePicture: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg"
        }
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowContainer}>
            {stories.map((story) => (
                <View key={story.id} style={styles.container}>
                    <View style={styles.pictureBorder}>
                        <Image source={{uri: story.profilePicture}} style={styles.userPicture} resizeMode="cover"/>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default HomeStories;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8
    },
    container: {
        alignItems: "center",
        paddingRight: 8
    },
    userPicture: {
        width: 75,
        height: 75,
        marginRight: 8,
        borderRadius: 50,
        margin: 3
    },
    pictureBorder: {
        borderWidth: 2,
        borderColor: "#FFFF00",
        borderRadius: 50,
        height: 85,
        width: 85
    }
});