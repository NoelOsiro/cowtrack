
import 'react-native-gesture-handler'; // Ensure this is at the very top
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      Hello
    </SafeAreaProvider>
  );
};

export default App;
