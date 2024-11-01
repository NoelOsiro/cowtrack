import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { View, Platform } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          opacity: 0.9,
          paddingBottom: Platform.OS === 'android' ? 10 : 6,
          height: 60,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: 10,
        },
        tabBarIconStyle: {
          width: 50,
          height: 50,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: 'transparent',
              borderRadius: 25,
              padding: 8,
            }}>
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={Colors[colorScheme ?? 'light'].tabIconSelected} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: 'transparent',
              borderRadius: 25,
              padding: 8,
            }}>
              <TabBarIcon name={focused ? 'compass' : 'compass-outline'} color={Colors[colorScheme ?? 'light'].tabIconSelected} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: 'transparent',
              borderRadius: 25,
              padding: 8,
            }}>
              <TabBarIcon name={focused ? 'document' : 'document-outline'} color={Colors[colorScheme ?? 'light'].tabIconSelected} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: 'transparent',
              borderRadius: 25,
              padding: 8,
            }}>
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={Colors[colorScheme ?? 'light'].tabIconSelected} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
