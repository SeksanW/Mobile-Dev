
// Buffer page for settings and activity. 
// This is just a placeholder for users to access their accoutn settings.
// Purpose is just to make the app more in line with actual instagram which were cloning.
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../components/ThemeContext";

type RowProps = {
  label: string;
  subtext?: string;
  onPress?: () => void;
};

function SettingsRow({ label, subtext, onPress }: RowProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    
    <TouchableOpacity
      style={[
        styles.row,
        { borderBottomColor: isDark ? "#fcfdff" : "#000000" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        <Text style={[styles.rowTitle, { color: isDark ? "#ffffff" : "#000000" }]}>
          {label}
        </Text>

        {subtext ? (
          <Text
            style={[
              styles.rowSubtext,
              { color: isDark ? "#f8f8f8" : "#000000" },
            ]}
          >
            {subtext}
          </Text>
        ) : null}
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={isDark ? "#ffffff" : "#000000"}
      />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1C1C1E" : "#fff" },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: isDark ? "#1f2937" : "#e5e7eb" },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={isDark ? "#ffffff" : "#111827"}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#111827" }]}>
          Settings and activity
        </Text>

        <View style={styles.iconBtn} />
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: isDark ? "#2A2A2C" : "#ffffff",
            borderColor: isDark ? "#ffffff" : "#000000",
          },
        ]}
      >
      
        <Text style={[styles.sectionLabel, { color: isDark ? "#9ca3af" : "#000000" }]}>
          Your account
        </Text>

        <SettingsRow
          label="Accounts Center"
          subtext="Personal details and account information"
          onPress={() => router.push("/account-center")}
        />
      </View>

      <View
        style={[
          styles.section,
          {
            backgroundColor: isDark ? "#2A2A2C" : "#f9fafb",
            borderColor: isDark ? "#1f2937" : "#e5e7eb",
          },
        ]}
      >
        <Text style={[styles.sectionLabel, { color: isDark ? "#ffffff" : "#1b1a1a" }]}>
          Other settings
        </Text>

        <SettingsRow label="Saved" />
        <SettingsRow label="Archive" />
        <SettingsRow label="Your activity" />
        <SettingsRow label="Notifications" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    minHeight: 56,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  iconBtn: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
  },
  section: {
    marginHorizontal: 12,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flex: 1,
    paddingRight: 12,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  rowSubtext: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
});