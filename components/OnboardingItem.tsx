import { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default function OnboardingItem({ item }: { item: any }) {
  const { width, height } = useWindowDimensions(); // Get screen width and height

  return (
    <View style={[styles.container, { width }]}>
      {/* Image takes 70% of the screen height */}
      <Image source={item.image} style={[styles.image, { width, height: height * 0.7 }]} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain', // Ensures the image scales properly
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
