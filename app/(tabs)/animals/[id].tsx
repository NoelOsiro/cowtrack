import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useAnimalStore } from '@/store/useAnimalstore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type Props = {};

const AnimalDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { animals } = useAnimalStore();

  // Find the animal by ID
  const animal = animals.find((animal) => animal.id === id);

  // Display a message if the animal is not found
  if (!animal) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Animal not found</Text>
      </View>
    );
  }

  // Render the details of the found animal
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: animal.name,
        }}
      />
      <ThemedText style={styles.title}>{animal.name}</ThemedText>
      <ThemedText style={styles.field}>Breed: {animal.breed}</ThemedText>
      <ThemedText style={styles.field}>Age: {animal.age} years</ThemedText>
      <ThemedText style={styles.field}>Gender: {animal.gender}</ThemedText>
      <ThemedText style={styles.field}>Purpose: {animal.purpose}</ThemedText>
      <ThemedText style={styles.field}>Species: {animal.species}</ThemedText>
    </ThemedView>
  );
};

export default AnimalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  field: {
    fontSize: 18,
    marginBottom: 5,
  },
  notFoundText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
