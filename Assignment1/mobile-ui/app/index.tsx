/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- 000944628  - John Mckay
- student number - Yufeng Fan

ASSIGNMENT:
Assignment: Building a Mobile UI with Expo and React Native

Purpose:
1: practice building a basic mobile user interface
using Expo and React Native
2: The application visually clones a selected mobile app screen by matching layout,
colors, and component sizing as closely as possible
3: With the main interactive feature being an Alert button
that displays a message when pressed, Functionality of other component and buttons is minimal.

NOTE: 
THE APP we will be copying is Instagram, there are 2 screenshots we will be copying, you cna find them under asset folder
Assignment1/mobile-ui/assets/IMG_1657.png
Assignment1/mobile-ui/assets/IMG_1658.png
*/

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Pressable,
} from "react-native";

import BottomNav, { TabKey } from "../components/BottomNav";
import HomePosts from "../components/HomePosts";
import ProfilePage from "../components/ProfilePage";
import HomeHeader from "../components/HomeHeader";
import HomeStories from "../components/HomeStories";

export default function Index() {
  const [tab, setTab] = useState<TabKey>("home");
  return (
    // Container for the whole screen
    //has the alert button and the bottom nav
    <View style={styles.container}>
      <View style={styles.content}>
      {tab === "home" ? (
        <>
          {/* Scroll area*/}
          <ScrollView showsVerticalScrollIndicator={false}>
            <HomeHeader />
            <HomeStories />
            <HomePosts />

            <View style={{ height: 20 }} />
          </ScrollView>
        </>
      ) : (
        <ProfilePage />
      )}
      </View>
      {/* Bottom navigation */}
      <View style={styles.bottomArea}>
      <BottomNav activeTab={tab} onChangeTab={setTab}/>
      
      <Pressable
        style={({ pressed }) => [styles.alertBtn, pressed && { opacity: 0.7 },]}
        hitSlop={12}
        android_ripple={{ color: "#ffffff33" }}
        onPress={() => {
        console.log("Alert pressed ✅");

        if (Platform.OS === "web") {
          window.alert("Alert Button pressed");
          return;
        }
        
        Alert.alert("Alert", "Alert Button pressed");}}>
        <Text style={styles.alertText}>Alert</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  
  bottomArea: {
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EDEDED",
  },

  alertBtn: {
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2E6BFF",
    alignItems: "center",
  },
  
  alertText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
