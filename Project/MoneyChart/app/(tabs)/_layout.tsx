import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { paddingBottom: 6, height: 60 },
        tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
          const icons: Record<string, { outline: IoniconName; filled: IoniconName }> = {
            index:    { outline: 'grid-outline',        filled: 'grid' },
            expenses: { outline: 'receipt-outline',     filled: 'receipt' },
            budgets:  { outline: 'pie-chart-outline',   filled: 'pie-chart' },
            settings: { outline: 'settings-outline',    filled: 'settings' },
          };
          const tab = icons[route.name] ?? { outline: 'ellipse-outline', filled: 'ellipse' };
          return <Ionicons name={focused ? tab.filled : tab.outline} size={size} color={color} />;
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
