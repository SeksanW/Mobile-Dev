import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from "react-native";

export default function ProfilePage() {
    const posts = Array.from({ length: 18 });
return (
    <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
        <Text style={styles.topIcon}>＋</Text>

        <View style={styles.titleWrap}>
            <Text style={styles.lock}></Text>
            <Text style={styles.username}>asian_guy_nyi</Text>
            <Text style={styles.down}>⌄</Text>
        </View>

        <Text style={styles.topIcon}>≡</Text>
        </View>

        <View style={styles.headerRow}>
        <View style={styles.avatar} />

            <View style={styles.statsRow}>
                <Stat number="12" label="posts" />
                <Stat number="359" label="followers" />
                <Stat number="581" label="following" />
            </View>
        </View>

        <Text style={styles.name}>Sek San Wangkhiree</Text>
        <Text style={styles.bio}>I live to drift them fork lifts.</Text>

        <View style={styles.buttonsRow}>
            <View style={[styles.btn, styles.btnWide]}>
                <Text style={styles.btnText}>Edit profile</Text>
            </View>

            <View style={[styles.btn, styles.btnWide]}>
                <Text style={styles.btnText}>Share profile</Text>
            </View>

            <View style={[styles.btn, styles.btnSmall]}>
                <Text style={styles.btnText}>+</Text>
            </View>
        </View>

        {/* Discover people section */}
        <View style={styles.discoverWrap}>
            <Text style={[styles.discoverWrapText, { fontWeight: "900" }]}>
                Discover People
            </Text>
            <Text style={styles.seeAllText}>
                See all
            </Text>
        </View>
        {/* Follow suggestions section with scrollable portfolio inside discver people box */}
        <View style={[styles.fallowSuggest, { height: 200 }]}>
        <ScrollView horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestRow}>
    
            {Array.from({ length: 10 }).map((_, i) => (
            <View key={i} style={styles.profileCard}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.namePlaceholder} />
            </View>
            ))}
        </ScrollView>
        </View>
        {/* Profile interactions row for selecting between post, retween,etc*/}
        <View style={styles.profileInteractions}>
            <TouchableOpacity style={styles.tabItem}>
                <Text style={[styles.interactionText, styles.activeText]}>
                    Posts
                </Text>
            <View style={styles.activeUnderline} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.interactionText}>
                    Tagged
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.interactionText}>
                    Share
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
                <Text style={styles.interactionText}>
                    Retweet
                </Text>
            </TouchableOpacity>
        </View>
        {/* Posts grid */}
        <FlatList
            data={posts}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={() => (
            <View style={styles.postBox} />
        )}/>
    </ScrollView>
    );
}

function Stat({ number, label }: { number: string; label: string }) {
return (
    <View style={styles.stat}>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingBottom: 12,
    },

    // Top bar
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
        color: "#111",
    },
    down: { fontSize: 18, marginTop: 4 },

    // Header row
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
        backgroundColor: "#D0D0D0",
    },
    statsRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    stat: { alignItems: "center" },
    statNumber: { fontSize: 20, fontWeight: "800", color: "#111" },
    statLabel: { fontSize: 14, color: "#111" },

    // Name + bio
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

    // Buttons
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

    // discoverWrap
    discoverWrap: {
        marginTop: 18,
        marginHorizontal: 12,
        padding: 12,
        borderRadius: 12,
    },
    discoverWrapText: { color: "#555" },

    // "see all" text in discoverWrap
    seeAllText: {
        position: "absolute",
        right: 12,
        top: 12,
        color: "#2E6BFF",
        fontWeight: "700",
    },
    
    // followSuggest
    fallowSuggest: {
        marginTop: 12,
        marginHorizontal: 12,
    },
    // row in suggestRow
    suggestRow: {
        paddingHorizontal: 12,
        paddingBottom: 8,
        gap: 8,
    },
    // each profile card in suggestRow
    profileCard: {
        width: 120,
        borderRadius: 12,
        backgroundColor: "#F0F0F0",
        alignItems: "center",
        padding: 12,
        borderBlockColor: "#a0a0a0",
        borderWidth: 1,
    },
    //place holder for porfile picture
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#D0D0D0",
    },
    // placeholder for names in profile card
    namePlaceholder: {
        marginTop: 40,
        width: "80%",
        height: 12,
        borderRadius: 6,
        backgroundColor: "#D0D0D0",
    },

    // profile interactions row (posts, tagged, share, retweet)
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

    // placeholder for posts in the grid
    postBox: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: "#222",
        margin: 1,
    },

});
