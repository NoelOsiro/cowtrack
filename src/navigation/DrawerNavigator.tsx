// src/navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
// import AddAnimalScreen from '../screens/AddAnimalScreen';
// import ReportsScreen from '../screens/ReportsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Drawer.Screen name="Add Animal" component={AddAnimalScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} /> */}
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerNavigator;
