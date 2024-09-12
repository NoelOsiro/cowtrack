import React from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Drawer from 'expo-router/drawer';
import { Link } from 'expo-router';


const CustomDrawerContent = () => {
  const [expanded, setExpanded] = React.useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '30%'],
    }),
  };

  return (
    <View style={styles.drawerContent}>
      <Pressable onPress={toggleDrawer} style={styles.headerButton}>
        <Feather name={expanded ? "chevron-up" : "chevron-down"} size={24} color="black" />
      </Pressable>
      <Animated.View style={[styles.dropdownContainer, animatedStyle]}>
        <Link href="/home" asChild>
        <Pressable
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>Profile</Text>
        </Pressable>
        </Link>
        {/* Add more dropdown items here */}
      </Animated.View>
    </View>
  );
};

const AppDrawer = () => (
  <Drawer
    drawerContent={(props) => <CustomDrawerContent />}
    screenOptions={({ navigation }) => ({
      headerShown: false,
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
          <Pressable style={styles.moreButton}>
            <Feather name="more-vertical" size={24} color="black" />
          </Pressable>
        </Link>
      ),
    })}
  >
    <Drawer.Screen
      name="home"
      options={{ headerShown: true, headerTitleAlign: 'center' }}
    />
    <Drawer.Screen
      name="category"
    />
    <Drawer.Screen
      name="items"
    />
    <Drawer.Screen
      name="profile"
      options={{ headerShown: true }}
    />
  </Drawer>
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerButton: {
    padding: 20,
    alignItems: 'center',
  },
  moreButton: {
    padding: 8,
  },
  dropdownContainer: {
    overflow: 'hidden',
  },
  drawerItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default function App() {
  return (

      <AppDrawer />

  );
}
