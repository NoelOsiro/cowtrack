

import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
import renderHeaderIcons from '@/components/drawer/renderHeaderIcons';

export default function RootLayout() {

  return (


      <Drawer
      screenOptions={{
        headerRight: () => (
          renderHeaderIcons()
        ),
      }
      }
      >
        {/* <Drawer.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Drawer.Screen
          name="details" 
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
            drawerLabelStyle: { fontSize: 16, fontWeight: 'bold',fontFamily: 'SpaceMono' },
            headerTitleStyle: { fontSize: 18, fontFamily: 'SpaceMono' },
          }}/>
        <Drawer.Screen name="onboarding" />
      </Drawer>
  );
}

