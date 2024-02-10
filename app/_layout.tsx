import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import ModalProvider from '../provider/bottomModalProvider';
import PostHeader from '../components/CustomHeaders/PostHeader';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="commenttab/commentScreen" options={{headerShown: true, animation: 'fade_from_bottom'}} />
        <Stack.Screen name='searchtab/searchScreen' options={{animation: 'fade', headerShown: false}}/>
        <Stack.Screen name='posttab/postScreen' options={{animation: 'fade_from_bottom', header: ({route}) => <PostHeader/>}}/>
        <Stack.Screen name='profiletab/ProfileScreen' options={{headerShown: false}}/>
        <Stack.Screen name='notificationtab/NotificationScreen' options={{headerShown: true, headerTitle: "Notifications"}}/>
      </Stack>
      <ModalProvider></ModalProvider>
    </ThemeProvider>
  );
}
