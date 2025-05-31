import { Slot, useRouter } from 'expo-router';
import { useAuthStore } from '../store/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hydrate = async () => {
      // Wait for any async store setup if needed
      setIsHydrated(true);
    };
    hydrate();
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/onboarding'); // use replace to avoid back nav loop
    }
  }, [isHydrated, isAuthenticated]);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
