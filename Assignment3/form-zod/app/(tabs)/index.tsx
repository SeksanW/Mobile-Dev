/* 
Mobile Application Development CPRG 303-C Group 12
Members:
- 930016 - Seksan Wangkhiree
- 000944628  - John Mckay
- student number - Yufeng Fan

ASSIGNMENT:Advanced Form Development and Validation with React Hook Form and Zod
*/
import { ScrollView, View, StyleSheet } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import HomeStories from "../../components/HomeStories";
import HomePosts from "../../components/HomePosts";

export default function Index() {
    return (
        <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader/>
        <HomeStories/>
        <HomePosts/>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
});
