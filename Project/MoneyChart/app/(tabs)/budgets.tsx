import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
  StyleSheet, Modal, ScrollView, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { getBudgets, addBudget, updateBudget, deleteBudget, getExpenses, Budget, Expense } from '../../lib/storage';

const CATEGORIES = [
  'Food', 'Transportation', 'Miscellaneous',
  'Utilities & Bills', 'Entertainment', 'Healthcare', 'Recreational',
];

const PERIODS = ['Monthly', 'Weekly', 'Yearly'];

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('Monthly');
  const [showCatPicker, setShowCatPicker] = useState(false);
  const [showPeriodPicker, setShowPeriodPicker] = useState(false);
  const [formError, setFormError] = useState('');

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    setBudgets(await getBudgets());
    setExpenses(await getExpenses());
  }

  function spentForCategory(cat: string): number {
    const now = new Date();
    return expenses
      .filter(e => {
        const d = new Date(e.date);
        return e.category === cat && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + spentForCategory(b.category), 0);
  const totalLeft = totalBudget - totalSpent;

  function openAdd() {
    setEditingBudget(null);
    setCategory(''); setAmount(''); setPeriod('Monthly');
    setModalVisible(true);
  }

  function openEdit(budget: Budget) {
    setEditingBudget(budget);
    setCategory(budget.category);
    setAmount(budget.amount.toString());
    setPeriod(budget.period);
    setModalVisible(true);
  }

  async function handleSave() {
    setFormError('');
    if (!category || !amount) {
      setFormError('Please fill in all fields.');
      return;
    }
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setFormError('Enter a valid amount.');
      return;
    }
    if (editingBudget) {
      await updateBudget({ ...editingBudget, category, amount: parsed, period });
    } else {
      await addBudget({ id: Date.now().toString(), category, amount: parsed, period });
    }
    setFormError('');
    setModalVisible(false);
    load();
  }

  async function handleDelete(id: string) {
    await deleteBudget(id);
    load();
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Budgets</Text>
          <Text style={styles.subtitle}>Set spending limits</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.sumLabel}>Budget</Text>
          <Text style={styles.sumAmount}>${totalBudget.toFixed(0)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.sumLabel}>Spent</Text>
          <Text style={styles.sumAmount}>${totalSpent.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.sumLabel}>Left</Text>
          <Text style={[styles.sumAmount, { color: totalLeft >= 0 ? '#38a169' : '#e53e3e' }]}>
            ${totalLeft.toFixed(2)}
          </Text>
        </View>
      </View>

      <FlatList
        data={budgets}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ListEmptyComponent={<Text style={styles.empty}>No budgets set{'\n'}Create your first budget</Text>}
        renderItem={({ item }) => {
          const spent = spentForCategory(item.category);
          const pct = item.amount === 0 ? 0 : Math.min(Math.round((spent / item.amount) * 100), 100);
          return (
            <View style={styles.budgetCard}>
              <View style={styles.budgetTop}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>{item.category.charAt(0)}</Text>
                </View>
                <View style={styles.budgetInfo}>
                  <Text style={styles.budgetCat}>{item.category}</Text>
                  <Text style={styles.budgetPeriod}>{item.period}</Text>
                </View>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>${spent.toFixed(0)} / ${item.amount.toFixed(0)}</Text>
                <Text style={styles.progressPct}>{pct}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(item)}>
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{editingBudget ? 'Edit Budget' : 'Add Budget'}</Text>

            {formError ? <Text style={styles.formError}>{formError}</Text> : null}

            <Text style={styles.label}>Category</Text>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCatPicker(!showCatPicker)}>
              <Text style={{ color: category ? '#000' : '#aaa' }}>{category || 'Select a category'}</Text>
              <Text>▾</Text>
            </TouchableOpacity>
            {showCatPicker && (
              <ScrollView style={styles.pickerDropdown} nestedScrollEnabled>
                {CATEGORIES.map(c => (
                  <TouchableOpacity key={c} onPress={() => { setCategory(c); setShowCatPicker(false); }}>
                    <Text style={styles.dropItem}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <Text style={styles.label}>Budget amount</Text>
            <TextInput style={styles.input} placeholder="1000" value={amount} onChangeText={setAmount} keyboardType="numeric" />

            <Text style={styles.label}>Period</Text>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowPeriodPicker(!showPeriodPicker)}>
              <Text>{period}</Text>
              <Text>▾</Text>
            </TouchableOpacity>
            {showPeriodPicker && (
              <View style={styles.pickerDropdown}>
                {PERIODS.map(p => (
                  <TouchableOpacity key={p} onPress={() => { setPeriod(p); setShowPeriodPicker(false); }}>
                    <Text style={styles.dropItem}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
                <Text style={styles.submitText}>{editingBudget ? 'Save' : 'Add Budget'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#888' },
  addBtn: { backgroundColor: '#000', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  addBtnText: { color: '#fff', fontWeight: '600' },
  summaryRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 8 },
  summaryCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center' },
  sumLabel: { fontSize: 12, color: '#888', marginBottom: 8 },
  sumAmount: { fontSize: 18, fontWeight: 'bold' },
  budgetCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12 },
  budgetTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logo: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  logoText: { fontWeight: 'bold', color: '#666' },
  budgetInfo: { flex: 1 },
  budgetCat: { fontSize: 15, fontWeight: '600' },
  budgetPeriod: { fontSize: 12, color: '#888' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 12, color: '#666' },
  progressPct: { fontSize: 12, color: '#666' },
  progressBar: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: '#333', borderRadius: 4 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40, lineHeight: 24 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 14 },
  pickerBtn: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between' },
  pickerDropdown: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', maxHeight: 150, marginBottom: 10 },
  dropItem: { padding: 12, fontSize: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, backgroundColor: '#f2f2f2', borderRadius: 12, padding: 14, alignItems: 'center' },
  cancelText: { fontWeight: '600' },
  submitBtn: { flex: 1, backgroundColor: '#000', borderRadius: 12, padding: 14, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' },
  formError: { color: '#e53e3e', fontSize: 13, marginBottom: 10, textAlign: 'center' },
  cardActions: { flexDirection: 'row', gap: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10, marginTop: 10 },
  editBtn: { flex: 1, backgroundColor: '#f0f4ff', borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  editBtnText: { color: '#3366FF', fontWeight: '600', fontSize: 13 },
  deleteBtn: { flex: 1, backgroundColor: '#fff0f0', borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  deleteBtnText: { color: '#e53e3e', fontWeight: '600', fontSize: 13 },
});
