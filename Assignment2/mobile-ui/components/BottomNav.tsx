/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

ASSIGNMENT:
Assignment: Building a Mobile UI with Expo and React Native

Purpose:
A Bottom navigation bar component that allows switching between "home" and "profile" tabs. 
The active tab is visually indicated, and the "home" tab displays an alert button while the "profile" tab shows a profile page.
*/
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export type TabKey = "home" | "profile";

export default function BottomNav({
    activeTab,
    onChangeTab,
}: {
    activeTab: TabKey;
    onChangeTab: (t: TabKey) => void;
}) {
return (
    <View style={styles.nav}>
        <TouchableOpacity onPress={() => onChangeTab("home")} style={styles.item}>
            <Text style={[styles.icon, activeTab === "home" && styles.active]}>⌂</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.item}>
            <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.item}>
            <View style={styles.addBox}>
                <Text style={styles.addPlus}>＋</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.item}>
            <Text style={styles.icon}>▶︎</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangeTab("profile")} style={styles.item}>
            <View>
                <Image source={{ uri: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg" }}
                    style={styles.avatar}
                    resizeMode="cover"/>
            </View>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        height: 56,
        borderTopWidth: 1,
        borderTopColor: "#EDEDED",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    item: {
        padding: 8,
        width: 56,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 22,
        color: "#111",
        fontWeight: "500",
    },

    active: {
        fontWeight: "900",
    },

    addBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#111",
        alignItems: "center",
        justifyContent: "center",
    },

    addPlus: {
        fontSize: 18,
        color: "#111",
        fontWeight: "900",
        marginTop: -1,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        overflow: "hidden"
    }
});
