import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { paddingBottom: 6, height: 60 },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          const icons: Record<string, string> = {
            index: '⊞',
            expenses: '🗂',
            budgets: '◑',
            settings: '⚙',
          };
          return (
            <Text style={{ fontSize: size - 4, color }}>
              {icons[route.name] ?? '●'}
            </Text>
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="expenses" options={{ title: 'Expenses' }} />
      <Tabs.Screen name="budgets" options={{ title: 'Budgets' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
