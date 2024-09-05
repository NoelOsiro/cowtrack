// src/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Icon
        name="menu"
        size={30}
        color="#000"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Text style={styles.title}>Farm Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
