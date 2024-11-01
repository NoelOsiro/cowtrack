import React, { useState, useEffect, useRef } from 'react';
import { Card, Icon, Text } from '@rneui/themed';
import { StyleSheet, FlatList, View,Pressable, Image, Animated  } from 'react-native';
import { COLORS, FONTFAMILY } from '@/constants/theme';
import { ThemedText } from './ThemedText';


type AnimalCountCardProps = {
  data: { category: string; count: number }[];
};

const AnimalCard = ({ category,count }:{category:string,count:number}) => {
  const [isPressed, setIsPressed] = useState(false);
  const backgroundColor = COLORS.primaryOrangeHex; // Replace '#fff' with your desired default color

  const animatedBackgroundColor = useRef(new Animated.Value(0)).current;
  const interpolatedBackgroundColor = animatedBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [backgroundColor, COLORS.primaryBlueHex], // Replace 'lightblue' with your desired pressed color
  });
  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(animatedBackgroundColor, {
      toValue: 1, // Replace 'lightblue' with your desired pressed color
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(animatedBackgroundColor, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={[styles.container, isPressed && styles.pressedContainer]}
      onPressIn={handlePressIn}
      accessible={true}
      onPressOut={handlePressOut}
      accessibilityLabel={`Card: ${category}, Starts on ${count}`}
    >
      <Animated.View style={[styles.card, { backgroundColor: interpolatedBackgroundColor }]}>
        {/* <Image source={{ uri: imageUrl }} style={[styles.image, isPressed && styles.pressedImage]} accessibilityLabel={`Course Image: ${category}`} /> */}
        <View style={styles.cardContent}>
          <ThemedText style={styles.title}>{category}</ThemedText>
          <ThemedText style={styles.date}>{count}</ThemedText>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const AnimalCountCard: React.FC<AnimalCountCardProps> = ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Category</Text>
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (<AnimalCard category={item.category} count={item.count} />)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.poppins_bold,
    marginBottom: 10,
  },
  pressedContainer: {
    // Add pressed effect styles for the entire container, e.g., shadow, opacity
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,
    borderRadius: 10,
  },
  listContent: {
    gap: 8,
  },
  card: {
    width: 140,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  countText: {
    fontSize: 16,
    marginTop: 4,
  },
  cardContent: {
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
  },
  image: {
    width: 100, // Adjust image size as needed
    height: 100,
    borderRadius: 10,
  },
  pressedImage: {
    // Add pressed effect styles for the image, e.g., opacity, transform
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});

export default AnimalCountCard;

