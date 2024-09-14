import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Drawer } from 'expo-router/drawer';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const mainDrawer = <Drawer
  screenOptions={() => ({
    headerShown: false,
    drawerActiveBackgroundColor: '#9fcbdda2',
    drawerActiveTintColor: '#000',
    drawerAllowFontScaling: true,
    drawerStyle: {
      backgroundColor: '#f0f0f0',
      width: 240,
    },
    drawerContentContainerStyle: {
      flex: 1,
      paddingTop: 20,
    },
    headerRight: () => (
      <Link href="/profile" asChild>
        <Pressable style={navbarStyles.moreButton}>
          <Feather name="more-vertical" size={24} color="black" />
        </Pressable>
      </Link>
    ),
  })}
>
  <Drawer.Screen
    name="home"
    options={{
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: () => <Feather name="home" size={24} color="black" />,
      headerShown: true,
      headerTitleAlign: 'center'
    }} />
  <Drawer.Screen
    name="category"
    options={{
      title: 'Categories',
      drawerLabel: 'Categories',
      drawerIcon: () => <Feather name="list" size={24} color="black" />,
      headerShown: true,
      headerTitleAlign: 'center',
    }} />
  <Drawer.Screen name="items"
    options={{
      title: 'Items',
      drawerLabel: 'Items',
      drawerIcon: () => <Feather name="book" size={24} color="black" />,
      headerShown: true,
      headerTitleAlign: 'center',
    }} />
  <Drawer.Screen
    name="profile"
    options={{
      title: 'Profile',
      headerShown: true,
      headerTitleAlign: 'center',
      drawerLabel: 'Profile',
      drawerIcon: () => <Feather name="user" size={24} color="black" />,
      headerLeft: () => (
        <Link href="/category" asChild>
          <Pressable style={navbarStyles.backButton}>
            <Feather name="chevron-left" size={24} color="black" />
          </Pressable>
        </Link>
      ),
    }} />
  <Drawer.Screen
    name="index"
    options={{
      title: 'CowTrack',
      drawerIcon: () => <Feather name="flag" size={24} color="black" />,
      headerShown: true,
      headerTitleAlign: 'center',
    }} />
</Drawer>;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),


  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <RootSiblingParent>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {mainDrawer}
      </ThemeProvider>
    </RootSiblingParent>

  );
}

const navbarStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  moreButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    padding: 16,
  },
  dropdownText: {
    fontSize: 16,
  },
};

