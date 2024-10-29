import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '@/constants/theme';

type Props = {
  item: {
    title: string;
    description: string;
    icon: any;
    text: string;
    image: any;
  };
};

const OnboardingItem = ({ item }: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width:width, height: height * 0.65, resizeMode: 'contain' }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  image: {
    marginBottom: SPACING.space_10,
    padding:SPACING.space_20,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontWeight: '800',
    fontSize: FONTSIZE.size_32,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontWeight: '300',
    color: COLORS.secondaryWhiteHex,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
