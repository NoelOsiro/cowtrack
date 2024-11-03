import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';
import { SPACING, COLORS, FONTFAMILY } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: COLORS.primaryOrangeHex,
          },
          headerTintColor: COLORS.primaryWhiteHex,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: FONTFAMILY.poppins_bold,
          },
          // Back Button using Theme Spacing and Colors
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: SPACING.space_16 }}
            >
              <Ionicons name="arrow-back" size={SPACING.space_24} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
          ),
          // More Button using Theme Spacing and Colors
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("More options")}
              style={{ paddingRight: SPACING.space_16 }}
            >
              <Ionicons name="ellipsis-vertical" size={SPACING.space_24} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
          ),
        })}
        initialRouteName="index"
      >
        <Stack.Screen name="[id]" options={{headerTitleAlign: 'center'}} />
        <Stack.Screen name="index" options={{headerTitleAlign: 'center', headerTitle:'Animals'}} />
      </Stack>
    </ThemeProvider>
  );
}
