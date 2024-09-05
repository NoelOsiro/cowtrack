
import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
// import AddAnimalScreen from '../screens/AddAnimalScreen';
// import ReportsScreen from '../screens/ReportsScreen';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/icon.png')}
    />
  );
}
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Dashboard"
    screenOptions={{ 
      headerTitle: (props: any) => <LogoTitle {...props} />,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#3a6eaa"
        />
      ), }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Stack.Screen name="AddAnimal" component={AddAnimalScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
