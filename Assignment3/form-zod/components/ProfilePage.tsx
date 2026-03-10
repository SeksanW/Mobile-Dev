/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- student number  - John Mckay
- student number - Yufeng Fan

Assignment: Advanced Multi-Screen Mobile Application with Collaborative Navigation 

Purpose:
A profile page component that mimics the Instagram profile screen, including a top bar, user information, follow suggestions, and a grid of posts. The component is designed to be displayed when the "profile" tab is selected in the bottom navigation.
*/
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Switch } from "react-native";
import { useTheme } from "./ThemeContext";

export default function ProfilePage() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    const posts = [
        {id: 1, image:
            "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
        },
        
        {id: 2, image:
            "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
        },
        
        {id: 3, image:
            "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
        },
        
        {id: 4, image:
            "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
        },

        {id: 5, image:
            "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
        },
        
        {id: 6, image:
            "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
        },
    ];

    const followSuggestions = [
        { id: 1, name: "very.largrman" },
        { id: 2, name: "john.mckay" },
        { id: 3, name: "yufeng.fan" },
        { id: 4, name: "doctor.strange" },
        { id: 5, name: "strange.doctor" },
        { id: 6, name: "tony.stark" },
    ];

    
return (
    <ScrollView 
        style={[
        styles.container,
        { backgroundColor: isDark ? "#1C1C1E" : "#fff" }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
        <Text style={[styles.topIcon, { color: isDark ? "#fff" : "#111" }]}>＋</Text>

        <View style={styles.titleWrap}>
            <Text style={styles.lock}></Text>
            <Text style={[styles.username, { color: isDark ? "#fff" : "#000" }]}>asian_guy_nyi</Text>
            <Text style={[styles.down, { color: isDark ? "#fff" : "#000" }]}>⌄</Text>
        </View>

        <Text style={[styles.topIcon, { color: isDark ? "#fff" : "#111" }]}>≡</Text>
        </View>

        <View style={styles.headerRow}>
        <Image source={{uri: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",}}
            style={styles.avatar}
            resizeMode="cover"/>

            <View style={styles.statsRow}>
                <Stat number="12" label="posts" isDark={isDark} />
                <Stat number="359" label="followers" isDark={isDark} />
                <Stat number="581" label="following" isDark={isDark} />
            </View>
        </View>

        <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>Sek San Wangkhiree</Text>
        <Text style={[styles.bio, { color: isDark ? "#fff" : "#000" }]}>I live to drift them fork lifts.</Text>
        
        <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: isDark ? "#fff" : "#000", marginBottom: 6 }}>
            Dark Mode
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={styles.buttonsRow}>
            <View style={[styles.btn, styles.btnWide, { backgroundColor: isDark ? "#2A2A2C" : "#F2F2F2" }]}>
                <Text style={[styles.btnText, { color: isDark ? "#fff" : "#000" }]}>Edit profile</Text>
            </View>

            <View style={[styles.btn, styles.btnWide, { backgroundColor: isDark ? "#2A2A2C" : "#F2F2F2" }]}>
                <Text style={[styles.btnText, { color: isDark ? "#fff" : "#000" }]}>Share profile</Text>
            </View>

            <View style={[styles.btn, styles.btnSmall, { backgroundColor: isDark ? "#2A2A2C" : "#F2F2F2" }]}>
                <Text style={[styles.btnText, { color: isDark ? "#fff" : "#000" }]}>+</Text>
            </View>
        </View>

        <View style={styles.discoverWrap}>
            <Text style={[styles.discoverWrapText, { fontWeight: "900" }, { color: isDark ? "#fff" : "#000" }]}>
                Discover People
            </Text>
            <Text style={styles.seeAllText}>
                See all
            </Text>
        </View>

        <View style={[styles.fallowSuggest, { height: 200 }]}>
        <ScrollView horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestRow}>

        {followSuggestions.map((user) => (
            <View key={user.id} style={[styles.profileCard, { backgroundColor: isDark ? "#2A2A2C" : "#F0F0F0" }, { borderColor: isDark ? "#555" : "#a0a0a0" }]}>
                <Image source={{uri: "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",}}
                    style={styles.avatarPlaceholder}
                    resizeMode="cover"/>

                <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}></View>
                <Text style={[styles.suggestName, { color: isDark ? "#fff" : "#000" }]}>{user.name}</Text>
                
                <TouchableOpacity style={styles.followBtn}>
                    <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
            </View>
        ))}
        </ScrollView>
        </View>
        <View style={styles.profileInteractions}>
            <TouchableOpacity style={styles.tabItem}>
                <Text style={[styles.interactionText, styles.activeText, { color: isDark ? "#fff" : "#000" }]}>
                    Posts
                </Text>
            <View style={styles.activeUnderline} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Text style={[styles.interactionText, { color: isDark ? "#fff" : "#000" }]}>
                    Tagged
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Text style={[styles.interactionText, { color: isDark ? "#fff" : "#000" }]}>
                    Share
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Text style={[styles.interactionText, { color: isDark ? "#fff" : "#000" }]}>
                    Retweet
                </Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={posts}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
        <Image
            source={{ uri: item.image }}
            style={styles.postImage}
            resizeMode="cover"/>)}/>
    </ScrollView>
    );
}

function Stat({ number, label, isDark }: { number: string; label: string; isDark: boolean }) {
return (
    <View style={styles.stat}>
        <Text style={[styles.statNumber, { color: isDark ? "#fff" : "#000" }]}>{number}</Text>
        <Text style={[styles.statLabel, { color: isDark ? "#fff" : "#000" }]}>{label}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingBottom: 12,
    },

    topBar: {
        height: 56,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    topIcon: {
        fontSize: 26,
        color: "#111",
    },
    titleWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    lock: { fontSize: 16 },
    username: {
        fontSize: 26,
        fontWeight: "800",
        color:"#111",
    },
    down: { fontSize: 18, marginTop: 4 },

    headerRow: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingTop: 8,
        alignItems: "center",
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 1,
        borderColor: "#ccc",
        overflow: "hidden",
    },
    statsRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    stat: { alignItems: "center" },
    statNumber: { fontSize: 20, fontWeight: "800", color: "#111" },
    statLabel: { fontSize: 14, color: "#111" },

    name: {
        paddingHorizontal: 12,
        paddingTop: 10,
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
    },
    bio: {
        paddingHorizontal: 12,
        paddingTop: 4,
        fontSize: 16,
        color: "#111",
    },

    buttonsRow: {
        flexDirection: "row",
        gap: 8,
        paddingHorizontal: 12,
        paddingTop: 12,
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    btnWide: { flex: 1 },
    btnSmall: { width: 44 },
    btnText: { fontWeight: "700", color: "#111" },

    discoverWrap: {
        marginTop: 18,
        marginHorizontal: 12,
        padding: 12,
        borderRadius: 12,
    },
    discoverWrapText: { color: "#555" },

    seeAllText: {
        position: "absolute",
        right: 12,
        top: 12,
        color: "#2E6BFF",
        fontWeight: "700",
    },

    fallowSuggest: {
        marginTop: 12,
        marginHorizontal: 12,
    },

    suggestRow: {
        paddingHorizontal: 12,
        paddingBottom: 8,
        gap: 8,
    },

    profileCard: {
        width: 120,
        height: 170, 
        borderRadius: 12,
        backgroundColor: "#F0F0F0",
        alignItems: "center",
        padding: 10,
        borderColor: "#a0a0a0",
        borderWidth: 1,
    },

    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
    },

    profileInteractions: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#222",
    },

    tabItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
    },

    interactionText: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "500",
    },

    activeText: {
        color: "#000000",
        fontWeight: "700",
    },

    activeUnderline: {
        marginTop: 6,
        height: 2,
        width: "60%",
        backgroundColor: "#000000",
        borderRadius: 2,
    },

    postImage: {
        flex: 1,
        aspectRatio: 1,
        margin: 1,
    },

    suggestName: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
    },

    followBtn: {
        marginTop: 8,
        width: "100%",
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: "#0095F6",
        alignItems: "center",
    },

    followText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
    },
});
