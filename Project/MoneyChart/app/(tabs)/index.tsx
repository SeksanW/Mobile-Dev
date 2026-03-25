import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from 'expo-router';
import { getExpenses, getBudgets, Expense, Budget } from '../../lib/storage';

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#FF6384',
  Transportation: '#36A2EB',
  Miscellaneous: '#FFCE56',
  'Utilities & Bills': '#4BC0C0',
  Entertainment: '#9966FF',
  Healthcare: '#FF9F40',
  Recreational: '#C9CBCF',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [chartWidth, setChartWidth] = useState(300);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        setExpenses(await getExpenses());
        setBudgets(await getBudgets());
      }
      load();
    }, [])
  );

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  function monthlyTotal(month: number, year: number): number {
    return expenses
      .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }

  const thisMonthSpend = monthlyTotal(thisMonth, thisYear);
  const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
  const lastMonthSpend = monthlyTotal(lastMonthDate.getMonth(), lastMonthDate.getFullYear());

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const remaining = totalBudget - thisMonthSpend;
  const budgetPercent = totalBudget === 0 ? 0 : Math.round((thisMonthSpend / totalBudget) * 100);

  const percentChange = lastMonthSpend === 0
    ? null
    : ((thisMonthSpend - lastMonthSpend) / lastMonthSpend) * 100;

  // Pie chart
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    const d = new Date(e.date);
    if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    }
  });
  const pieData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    amount: categoryTotals[cat],
    color: CATEGORY_COLORS[cat] || '#999',
    legendFontColor: '#333',
    legendFontSize: 12,
  }));

  // 6-month trend
  const trendLabels: string[] = [];
  const trendData: number[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(thisYear, thisMonth - i, 1);
    trendLabels.push(MONTHS[d.getMonth()]);
    trendData.push(monthlyTotal(d.getMonth(), d.getFullYear()));
  }

  const recentExpenses = expenses.slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Money Chart</Text>
      </View>

      <View style={styles.cardGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>This Month Spending</Text>
          <Text style={styles.cardAmount}>${thisMonthSpend.toFixed(2)}</Text>
          {percentChange !== null && (
            <Text style={[styles.cardSub, { color: percentChange > 0 ? '#e53e3e' : '#38a169' }]}>
              {percentChange > 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(0)}%
              {percentChange > 100 ? '!!' : ''}
            </Text>
          )}
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>Your Budget</Text>
          <Text style={styles.cardAmount}>${totalBudget.toFixed(2)}</Text>
          <Text style={styles.cardSub}>Monthly</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>Last Month Spending</Text>
          <Text style={styles.cardAmount}>${lastMonthSpend.toFixed(2)}</Text>
          <Text style={styles.cardSub}>Previous</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>Remaining Budget</Text>
          <Text style={[styles.cardAmount, { color: remaining >= 0 ? '#38a169' : '#e53e3e' }]}>
            ${remaining.toFixed(2)}
          </Text>
          <Text style={styles.cardSub}>{budgetPercent}% budget</Text>
        </View>
      </View>

      <View
        style={styles.chartCard}
        onLayout={e => setChartWidth(e.nativeEvent.layout.width - 32)}
      >
        <Text style={styles.chartTitle}>Spending by Category Pie</Text>
        {pieData.length > 0 ? (
          <PieChart
            data={pieData}
            width={chartWidth}
            height={180}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="0"
            hasLegend
          />
        ) : (
          <View style={styles.emptyChart}>
            <View style={styles.emptyCircle} />
          </View>
        )}
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>6-Month Trend</Text>
        <LineChart
          data={{
            labels: trendLabels,
            datasets: [
              { data: trendData, color: () => '#38a169', strokeWidth: 2 },
              { data: trendData.map(() => totalBudget / 6 || 0), color: () => '#e53e3e', strokeWidth: 1 },
            ],
          }}
          width={chartWidth}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 8 }}
        />
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Recent Expenses</Text>
        {recentExpenses.length === 0 ? (
          <Text style={styles.empty}>No expenses yet</Text>
        ) : (
          recentExpenses.map(e => (
            <View key={e.id} style={styles.expenseRow}>
              <View style={styles.expenseLogo}>
                <Text style={styles.expenseLogoText}>{e.description.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseName}>{e.description}</Text>
                <Text style={styles.expenseCat}>{e.category}</Text>
              </View>
              <View style={styles.expenseRight}>
                <Text style={styles.expenseAmount}>${e.amount.toFixed(0)}</Text>
                <Text style={styles.expenseDate}>
                  {new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(51, 102, 255, ${opacity})`,
  labelColor: () => '#666',
  strokeWidth: 2,
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#3366FF' },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, paddingTop: 20, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 8 },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  summaryCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, width: '47%',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardLabel: { fontSize: 12, color: '#888', marginBottom: 8 },
  cardAmount: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  cardSub: { fontSize: 12, color: '#888', marginTop: 2 },
  chartCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    margin: 16, marginTop: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  emptyChart: { alignItems: 'center', paddingVertical: 20 },
  emptyCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#e0e0e0' },
  empty: { color: '#aaa', textAlign: 'center', paddingVertical: 20 },
  expenseRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  expenseLogo: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  expenseLogoText: { fontWeight: 'bold', color: '#666' },
  expenseInfo: { flex: 1 },
  expenseName: { fontSize: 14, fontWeight: '600' },
  expenseCat: { fontSize: 12, color: '#888' },
  expenseRight: { alignItems: 'flex-end' },
  expenseAmount: { fontSize: 14, fontWeight: 'bold' },
  expenseDate: { fontSize: 11, color: '#aaa' },
});
