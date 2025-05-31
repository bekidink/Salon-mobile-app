import { Stack, useRouter } from 'expo-router';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { onboardingData } from '~/utils/onboarding-data';
import { useRef, useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < onboardingData.length) {
      scrollViewRef.current?.scrollTo({ x: width * nextPage, animated: true });
      setCurrentPage(nextPage);
    } else {
      router.replace('/auth/sing-up' );
    }
  };

  const skipOnboarding = () => {
    // router.replace('/auth/sign-in');
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}>
        {onboardingData.map((item, index) => (
          <ImageBackground
            key={index}
            source={item.img}
            style={{ width, height, justifyContent: 'flex-end' }}
            resizeMode="cover">
            <View
              style={{
                alignItems: 'center',
                paddingBottom: 100,
                paddingHorizontal: 30,
              }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 16,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {item.subtitle}
              </Text>

              {/* Dots */}
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                {onboardingData.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={{
                      height: 10,
                      width: currentPage === dotIndex ? 30 : 10,
                      borderRadius: 5,
                      backgroundColor: currentPage === dotIndex ? '#FFA500' : '#FFF',
                      marginHorizontal: 5,
                    }}
                  />
                ))}
              </View>

              {/* Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#156778',
                  paddingVertical: 12,
                  paddingHorizontal: 100,
                  borderRadius: 25,
                  marginTop: 25,
                }}
                onPress={goToNextPage}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                </Text>
              </TouchableOpacity>

              {/* Sign-in Option */}
              <View className="mb-10 mt-16 items-center justify-center">
                <Text className="text-white">
                  Already have an account?{' '}
                  <Text
                    className="text-secondary font-semibold"
                    onPress={() => router.replace('/auth/login')} // replace 'SignIn' with your screen name
                  >
                    Sign in
                  </Text>
                </Text>
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </>
  );
}
