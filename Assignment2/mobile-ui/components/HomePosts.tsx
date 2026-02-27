import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";

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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(0);

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
          <TouchableOpacity>
            <Svg width={16} height={16} viewBox="0 0 16 16">
              <Path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                  fill="#FFFFFF"
              />
              {/* for filled replace d with d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" fill="#FF0000" */}
            </Svg>
          </TouchableOpacity>
          <Text style={styles.interactionItemText}>146</Text>
        </View>

        <View style={styles.interactionItem}>
          <Text style={styles.interactionItemIcon}>💬</Text>
          <Text style={styles.interactionItemText}>413</Text>
        </View>

        <View style={styles.interactionItem}>
          <TouchableOpacity
            style={styles.interactionItemIcon}
            onPress={() => {
              setSelectedPost(item.id);
              setModalVisible(true);
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 16 16">
              <Path
                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
                fill="#FFFFFF"
              /> 
            </Svg>

            {/* filled version -> replace d= with d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" fill="#FFFFFF" */}
          </TouchableOpacity>
          <Text style={styles.interactionItemText}>146</Text>
        </View>

        <View style={styles.interactionItem}>
          <Text style={styles.interactionItemIcon}>🔖</Text>
          <Text style={styles.interactionItemText}>1,991</Text>
        </View>
      </View>

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

      {/* Modal for Post Interaction */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Sent!</Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderColor: "transparent",
    backgroundColor: "transparent"
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
  },
  modalCloseBtn: {
    backgroundColor: "#0095f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "700"
  },
  iconColorSelected: {
    
  }
});
