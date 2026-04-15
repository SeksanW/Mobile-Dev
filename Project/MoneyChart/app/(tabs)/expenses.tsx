import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { getExpenses, addExpense, updateExpense, deleteExpense, Expense } from '../../lib/storage';

function today() {
  return new Date().toISOString().split('T')[0];
}

const CATEGORIES = [
  'Food', 'Transportation', 'Miscellaneous',
  'Utilities & Bills', 'Entertainment', 'Healthcare', 'Recreational',
];

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showCatFilter, setShowCatFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today());
  const [category, setCategory] = useState('');
  const [showCatPicker, setShowCatPicker] = useState(false);
  const [formError, setFormError] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  async function loadExpenses() {
    setExpenses(await getExpenses());
  }

  function openAdd() {
    setEditingExpense(null);
    setDescription(''); setAmount(''); setDate(today()); setCategory(''); setFormError('');
    setModalVisible(true);
  }

  function openEdit(expense: Expense) {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setDate(expense.date);
    setCategory(expense.category);
    setFormError('');
    setModalVisible(true);
  }

  async function handleSave() {
    setFormError('');
    if (!description || !amount || !date || !category) {
      setFormError('Please fill in all fields.');
      return;
    }
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setFormError('Enter a valid amount.');
      return;
    }
    if (editingExpense) {
      await updateExpense({ ...editingExpense, description, amount: parsed, date, category });
    } else {
      await addExpense({ id: Date.now().toString(), description, amount: parsed, date, category });
    }
    setModalVisible(false);
    loadExpenses();
  }

  async function handleDelete(id: string) {
    await deleteExpense(id);
    loadExpenses();
  }

  const filtered = expenses.filter(e => {
    const matchSearch = e.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat ? e.category === filterCat : true;
    return matchSearch && matchCat;
  });

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Expenses</Text>
          <Text style={styles.subtitle}>Track your spending</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterCard}>
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search expenses..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.catFilter} onPress={() => setShowCatFilter(!showCatFilter)}>
          <Text style={styles.catFilterText}>{filterCat || 'Select a category'}</Text>
          <Text>▾</Text>
        </TouchableOpacity>
        {showCatFilter && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => { setFilterCat(''); setShowCatFilter(false); }}>
              <Text style={styles.dropItem}>All categories</Text>
            </TouchableOpacity>
            {CATEGORIES.map(c => (
              <TouchableOpacity key={c} onPress={() => { setFilterCat(c); setShowCatFilter(false); }}>
                <Text style={styles.dropItem}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No expenses found{'\n'}Add your first expense to get started</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <View style={styles.cardMain}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>{item.description.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.expInfo}>
                <Text style={styles.expName}>{item.description}</Text>
                <Text style={styles.expCat}>{item.category}</Text>
              </View>
              <View style={styles.expRight}>
                <Text style={styles.expAmount}>${item.amount.toFixed(2)}</Text>
                <Text style={styles.expDate}>{formatDate(item.date)}</Text>
              </View>
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
        )}
      />

      <View style={styles.totalBar}>
        <Text style={styles.totalLabel}>Expenses</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editingExpense ? 'Edit Expense' : 'Add Expense'}</Text>

            {formError ? <Text style={styles.formError}>{formError}</Text> : null}

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder="e.g., Grocery shopping" value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Amount</Text>
            <TextInput style={styles.input} placeholder="0" value={amount} onChangeText={setAmount} keyboardType="numeric" />

            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />

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

            <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
              <Text style={styles.submitText}>{editingExpense ? 'Save Changes' : 'Add Expense'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  filterCard: { backgroundColor: '#fff', margin: 16, marginTop: 0, borderRadius: 12, padding: 12 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14 },
  catFilter: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12 },
  catFilterText: { color: '#555' },
  dropdown: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', marginTop: 4 },
  dropItem: { padding: 12, fontSize: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  expenseCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 },
  cardMain: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logo: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  logoText: { fontWeight: 'bold', color: '#666', fontSize: 16 },
  expInfo: { flex: 1 },
  expName: { fontSize: 15, fontWeight: '600' },
  expCat: { fontSize: 12, color: '#888' },
  expRight: { alignItems: 'flex-end' },
  expAmount: { fontSize: 15, fontWeight: 'bold' },
  expDate: { fontSize: 11, color: '#aaa' },
  cardActions: { flexDirection: 'row', gap: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  editBtn: { flex: 1, backgroundColor: '#f0f4ff', borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  editBtnText: { color: '#3366FF', fontWeight: '600', fontSize: 13 },
  deleteBtn: { flex: 1, backgroundColor: '#fff0f0', borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  deleteBtnText: { color: '#e53e3e', fontWeight: '600', fontSize: 13 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40, lineHeight: 24 },
  totalBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  totalLabel: { fontSize: 15, color: '#555' },
  totalAmount: { fontSize: 18, fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 },
  closeBtn: { position: 'absolute', right: 20, top: 20, zIndex: 10, padding: 8 },
  closeText: { fontSize: 18, color: '#666' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 14 },
  pickerBtn: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between' },
  pickerDropdown: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', maxHeight: 160, marginBottom: 10 },
  submitBtn: { backgroundColor: '#000', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  formError: { color: '#e53e3e', fontSize: 13, marginBottom: 10, textAlign: 'center' },
});
