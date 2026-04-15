import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import {
  getUser,
  saveUser,
  getExpenses,
  getBudgets,
  setIsLoggedIn,
  Expense,
  Budget,
} from "../../lib/storage";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Settings() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);

  useFocusEffect(
    useCallback(() => {
      load();
    }, []),
  );

  async function load() {
    const u = await getUser();
    if (u) {
      setFirstName(u.firstName || "");
      setLastName(u.lastName || "");
      setEmail(u.email || "");
    }
    setExpenses(await getExpenses());
    setBudgets(await getBudgets());
  }

  async function handleSaveProfile() {
    const current = await getUser();
    if (!current) return;
    await saveUser({ ...current, firstName, lastName, email });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  }

  // Previous 5 months only (not current month)
  const now = new Date();
  const previousMonths = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
      month: d.getMonth(),
      year: d.getFullYear(),
    };
  });

  function expensesForMonth(month: number, year: number): Expense[] {
    return expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }

  function spentByCategory(cat: string, month: number, year: number): number {
    return expensesForMonth(month, year)
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
  }

  const totalBudget = budgets.reduce((s, b) => s + b.amount, 0);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Money Chart</Text>
      </View>

      {/* Statistics */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.sectionSub}>Tap a month to view its history</Text>

        {previousMonths.map((m) => {
          const monthExpenses = expensesForMonth(m.month, m.year);
          const totalSpent = monthExpenses.reduce((s, e) => s + e.amount, 0);
          const isOpen = selectedMonth === m.label;

          return (
            <View key={m.label}>
              <TouchableOpacity
                style={[styles.monthRow, isOpen && styles.monthRowSelected]}
                onPress={() => setSelectedMonth(isOpen ? null : m.label)}
              >
                <View>
                  <Text style={styles.monthLabel}>{m.label}</Text>
                  <Text style={styles.monthMeta}>
                    {monthExpenses.length} expense
                    {monthExpenses.length !== 1 ? "s" : ""} · $
                    {totalSpent.toFixed(2)} spent
                  </Text>
                </View>
                <Text style={styles.chevron}>{isOpen ? "▴" : "▾"}</Text>
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.monthDetail}>
                  {/* Budget summary */}
                  <Text style={styles.detailSection}>Budget Overview</Text>
                  <View style={styles.summaryRow}>
                    <View style={styles.summaryCard}>
                      <Text style={styles.sumLabel}>Budget</Text>
                      <Text style={styles.sumAmount}>
                        ${totalBudget.toFixed(0)}
                      </Text>
                    </View>
                    <View style={styles.summaryCard}>
                      <Text style={styles.sumLabel}>Spent</Text>
                      <Text style={styles.sumAmount}>
                        ${totalSpent.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.summaryCard}>
                      <Text style={styles.sumLabel}>Left</Text>
                      <Text
                        style={[
                          styles.sumAmount,
                          {
                            color:
                              totalBudget - totalSpent >= 0
                                ? "#38a169"
                                : "#e53e3e",
                          },
                        ]}
                      >
                        ${(totalBudget - totalSpent).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  {/* Budget goals by category */}
                  {budgets.length > 0 && (
                    <>
                      <Text style={styles.detailSection}>Budget Goals</Text>
                      {budgets.map((b) => {
                        const spent = spentByCategory(
                          b.category,
                          m.month,
                          m.year,
                        );
                        const pct =
                          b.amount === 0
                            ? 0
                            : Math.min(
                                Math.round((spent / b.amount) * 100),
                                100,
                              );
                        const over = spent > b.amount;
                        return (
                          <View key={b.id} style={styles.goalRow}>
                            <View style={styles.goalHeader}>
                              <Text style={styles.goalCat}>{b.category}</Text>
                              <Text
                                style={[
                                  styles.goalPct,
                                  { color: over ? "#e53e3e" : "#38a169" },
                                ]}
                              >
                                {over ? "Over budget" : `${pct}%`}
                              </Text>
                            </View>
                            <View style={styles.goalAmounts}>
                              <Text style={styles.goalSub}>
                                ${spent.toFixed(0)} / ${b.amount.toFixed(0)}
                              </Text>
                            </View>
                            <View style={styles.progressBar}>
                              <View
                                style={[
                                  styles.progressFill,
                                  {
                                    width: `${pct}%` as any,
                                    backgroundColor: over ? "#e53e3e" : "#333",
                                  },
                                ]}
                              />
                            </View>
                          </View>
                        );
                      })}
                    </>
                  )}

                  {/* Expenses list */}
                  <Text style={styles.detailSection}>Expenses</Text>
                  {monthExpenses.length === 0 ? (
                    <Text style={styles.noData}>
                      No expenses recorded this month
                    </Text>
                  ) : (
                    monthExpenses.map((e) => (
                      <View key={e.id} style={styles.expRow}>
                        <View style={styles.expLogo}>
                          <Text style={styles.expLogoText}>
                            {e.description.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                        <View style={styles.expInfo}>
                          <Text style={styles.expName}>{e.description}</Text>
                          <Text style={styles.expCat}>{e.category}</Text>
                        </View>
                        <View style={styles.expRight}>
                          <Text style={styles.expAmount}>
                            ${e.amount.toFixed(0)}
                          </Text>
                          <Text style={styles.expDate}>
                            {formatDate(e.date)}
                          </Text>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Profile */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {firstName ? firstName.charAt(0).toUpperCase() : "?"}
            </Text>
          </View>
        </View>

        <Text style={styles.infoTitle}>Personal Information</Text>
        <View style={styles.nameRow}>
          <View style={styles.nameField}>
            <Text style={styles.fieldLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
          </View>
          <View style={styles.nameField}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
          </View>
        </View>

        <Text style={styles.fieldLabel}>Email Address</Text>
        <TextInput
          style={[styles.input, styles.fullInput]}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {profileSaved && <Text style={styles.savedMsg}>Profile saved!</Text>}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
          <Text style={styles.saveBtnText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signOutBtn}
        onPress={async () => {
          await setIsLoggedIn(false);
          router.replace("/auth/sign-in");
        }}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 16, paddingTop: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  sectionSub: { fontSize: 12, color: "#aaa", marginBottom: 14 },

  // Month rows
  monthRow: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthRowSelected: {
    borderWidth: 2,
    borderColor: "#3366FF",
    backgroundColor: "#f0f4ff",
  },
  monthLabel: { fontSize: 15, fontWeight: "600" },
  monthMeta: { fontSize: 12, color: "#888", marginTop: 2 },
  chevron: { fontSize: 12, color: "#888" },

  // Expanded month detail
  monthDetail: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  detailSection: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
    marginTop: 10,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Summary cards
  summaryRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  sumLabel: { fontSize: 11, color: "#888", marginBottom: 4 },
  sumAmount: { fontSize: 15, fontWeight: "bold" },

  // Budget goals
  goalRow: { marginBottom: 10 },
  goalHeader: { flexDirection: "row", justifyContent: "space-between" },
  goalCat: { fontSize: 13, fontWeight: "600" },
  goalPct: { fontSize: 12, fontWeight: "600" },
  goalAmounts: { marginBottom: 4 },
  goalSub: { fontSize: 11, color: "#888" },
  progressBar: { height: 6, backgroundColor: "#e0e0e0", borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },

  // Expense rows
  expRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  expLogo: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  expLogoText: { fontWeight: "bold", color: "#666", fontSize: 13 },
  expInfo: { flex: 1 },
  expName: { fontSize: 13, fontWeight: "600" },
  expCat: { fontSize: 11, color: "#888" },
  expRight: { alignItems: "flex-end" },
  expAmount: { fontSize: 13, fontWeight: "bold" },
  expDate: { fontSize: 11, color: "#aaa" },
  noData: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 8,
  },

  // Profile
  avatarContainer: { alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 28, fontWeight: "bold", color: "#666" },
  infoTitle: { fontSize: 14, color: "#888", marginBottom: 12 },
  nameRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  nameField: { flex: 1 },
  fieldLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  fullInput: { marginBottom: 14 },
  savedMsg: {
    color: "#38a169",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  saveBtn: {
    backgroundColor: "#3366FF",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  saveBtnText: { color: "#fff", fontWeight: "bold" },
  signOutBtn: {
    margin: 16,
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e53e3e",
  },
  signOutText: { color: "#e53e3e", fontWeight: "bold", fontSize: 15 },
});
