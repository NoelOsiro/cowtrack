// src/components/CustomDrawerContent.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props:any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appName}>Farm Tracker</Text>
      </View>
      <DrawerItem
        label="Dashboard"
        icon={() => <Icon name="dashboard" size={20} color="#000" />}
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      <DrawerItem
        label="Add Animal"
        icon={() => <Icon name="add-circle" size={20} color="#000" />}
        onPress={() => props.navigation.navigate('Add Animal')}
      />
      <DrawerItem
        label="Reports"
        icon={() => <Icon name="bar-chart" size={20} color="#000" />}
        onPress={() => props.navigation.navigate('Reports')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default CustomDrawerContent;
