import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';
const BUDGETS_KEY = 'budgets';
const USER_KEY = 'user';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function getExpenses(): Promise<Expense[]> {
  const data = await AsyncStorage.getItem(EXPENSES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveExpenses(expenses: Expense[]): Promise<void> {
  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
}

export async function addExpense(expense: Expense): Promise<void> {
  const expenses = await getExpenses();
  expenses.unshift(expense);
  await saveExpenses(expenses);
}

export async function updateExpense(updated: Expense): Promise<void> {
  const expenses = await getExpenses();
  await saveExpenses(expenses.map(e => e.id === updated.id ? updated : e));
}

export async function deleteExpense(id: string): Promise<void> {
  const expenses = await getExpenses();
  await saveExpenses(expenses.filter(e => e.id !== id));
}

export async function getBudgets(): Promise<Budget[]> {
  const data = await AsyncStorage.getItem(BUDGETS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveBudgets(budgets: Budget[]): Promise<void> {
  await AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
}

export async function addBudget(budget: Budget): Promise<void> {
  const budgets = await getBudgets();
  budgets.push(budget);
  await saveBudgets(budgets);
}

export async function updateBudget(updated: Budget): Promise<void> {
  const budgets = await getBudgets();
  await saveBudgets(budgets.map(b => b.id === updated.id ? updated : b));
}

export async function deleteBudget(id: string): Promise<void> {
  const budgets = await getBudgets();
  await saveBudgets(budgets.filter(b => b.id !== id));
}

export async function getUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function saveUser(user: User): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}
