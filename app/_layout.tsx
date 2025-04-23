// app/_layout.tsx
import { Slot, Redirect } from 'expo-router';
import { useAuthStore } from '../store/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      // Wait for the store to rehydrate
      // Since expo-secure-store is asynchronous, ensure that hydration is complete
      // You might need to implement a mechanism to detect when hydration is done
      setIsHydrated(true);
    };
    hydrate();
  }, []);

  if (!isHydrated) {
    // Show a loading indicator while the store is hydrating
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/details" />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
