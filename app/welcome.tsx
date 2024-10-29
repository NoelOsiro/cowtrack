import { COLORS, SPACING, FONTFAMILY, FONTSIZE, BORDERRADIUS } from '@/constants/theme';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Farm Manager</Text>
      <Text style={styles.tagline}>Easily manage your farm’s livestock with a few taps!</Text>
      <Pressable style={styles.getStartedButton}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_20,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_8,
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryDarkGreyHex,
    textAlign: 'center',
    marginBottom: SPACING.space_20,
  },
  getStartedButton: {
    backgroundColor: COLORS.primaryBlueHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

export default WelcomeScreen;
