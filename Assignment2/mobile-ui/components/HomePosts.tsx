import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { use, useState } from "react";

const HomePosts = () => {
  const posts = [
    {
      id: 1,
      profileImage:
        "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",
      username: "eileengu",
      audioInfo: "eileengu · Original audio",
      postImage:
        "https://www.sait.ca/assets/image/news/2025/october/nw-get-ready-to-make-a-difference-730x485.png",
    },
    {
      id: 2,
      profileImage:
        "https://www.sait.ca/assets/image/brand-guidelines/logos/logo-catalyst-fullcolour-600x600.jpg",
      username: "eileengu",
      audioInfo: "eileengu · Original audio",
      postImage:
        "https://www.sait.ca/assets/image/news/2024/september/nw-sustainability-eco-ambassadors.jpg",
    },
  ];

  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });

  const [likedCounters, setLikedCounters] = useState<{ [key: number]: number }>(
    {
      1: 10,
      2: 20,
    },
  );

  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });

  return posts.map((item) => (
    <View key={item.id}>
      {/*  Header Section */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Profile Picture */}
          <View style={styles.profile}>
            <Image
              source={{
                uri: item.profileImage,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <View>
            {/* Username Section */}
            <View style={styles.username}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.usernameCheckmark}>✓</Text>
            </View>

            {/* Audio Info Section */}
            <View style={styles.audioInfo}>
              <Text style={styles.audioInfoText}>♫ </Text>
              <Text style={styles.audioInfoText}>{item.audioInfo}</Text>
            </View>
          </View>
        </View>

        {/* More Options */}
        <TouchableOpacity>
          <Text style={styles.more}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageSection}>
        <Image
          source={{
            uri: item.postImage,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      {/* Interaction Bar */}
      <View style={styles.interactionBar}>
        <View style={styles.interactionItem}>
          <TouchableOpacity
            onPress={() => {
              setLikedItems((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }));
              setLikedCounters((prev) => ({
                ...prev,
                [item.id]: prev[item.id] + (likedItems[item.id] ? -1 : 1),
              }));
            }}
          >
            <Text style={styles.interactionItemIcon}>
              {likedItems[item.id] ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.interactionItemText}>
            {likedCounters[item.id]}
          </Text>
        </View>

        <View style={styles.interactionItem}>
          <TouchableOpacity
            onPress={() => {
              setShowComments((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }));
            }}
          >
            <Text style={styles.interactionItemIcon}>💬</Text>
          </TouchableOpacity>
          <Text style={styles.interactionItemText}>413</Text>
        </View>

        <View style={styles.interactionItem}>
          <Text style={styles.interactionItemIcon}>↗️</Text>
          <Text style={styles.interactionItemText}>146</Text>
        </View>

        <View style={styles.interactionItem}>
          <Text style={styles.interactionItemIcon}>🔖</Text>
          <Text style={styles.interactionItemText}>1,991</Text>
        </View>
      </View>
      {showComments[item.id] && (
        <View style={styles.commentBox}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            multiline
          />
        </View>
      )}

      {/* Post Description and Date Section */}
      <View style={styles.postSection}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.postUsername}>eileengu</Text>
          <Text style={styles.postContent}>
            Part of a recent conversation with People's Daily about the
            development... <Text style={styles.postMore}>more</Text>
          </Text>
        </View>
        <Text style={styles.postDate}>January 27</Text>
      </View>
    </View>
  ));
};

export default HomePosts;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#FFD700",
    overflow: "hidden",
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    color: "#090909",
    fontWeight: "600",
    fontSize: 14,
  },
  usernameCheckmark: {
    color: "#0095f6",
    marginLeft: 4,
    fontSize: 14,
  },
  audioInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  audioInfoText: {
    color: "#6c6969",
    fontSize: 12,
  },
  more: {
    color: "#0c0c0c",
    fontSize: 20,
  },
  imageSection: {
    width: "100%",
    height: 600,
    backgroundColor: "#1a1a1a",
  },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  interactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  interactionItemIcon: {
    fontSize: 18,
  },
  interactionItemText: {
    color: "#0e0d0d",
    fontSize: 12,
  },
  postSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
  },
  postUsername: {
    color: "#0e0d0d",
    fontWeight: "600",
    marginRight: 6,
  },
  postContent: {
    color: "#0e0d0d",
    flex: 1,
  },
  postMore: {
    color: "#0095f6",
  },
  postDate: {
    color: "#6c6969",
    fontSize: 12,
    marginTop: 8,
  },
  commentBox: {
    marginTop: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    margin: 5,
    minHeight: 80,
    textAlignVertical: "top",
  },
});
