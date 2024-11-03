import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useAnimalStore } from '@/store/useAnimalstore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING, FONTSIZE, BORDERRADIUS, FONTFAMILY } from '@/constants/theme';

type Props = {};

const AnimalDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { animals, deleteAnimal } = useAnimalStore();

  // Find the animal by ID
  const animal = animals.find((animal) => animal.id === id);

  if (!animal) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.notFoundText}>Animal not found</ThemedText>
      </View>
    );
  }

  const handleEdit = () => {
    // Navigate to edit page with animal ID
  };

  const handleDelete = () => {
    deleteAnimal(animal.id);
    // Navigate back or show confirmation
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: animal.name }} />
      <View style={styles.detailsContainer}>
        <ThemedText style={styles.title}>{animal.name}</ThemedText>
        <ThemedText style={styles.field}>Breed: {animal.breed}</ThemedText>
        <ThemedText style={styles.field}>DOB: {animal.dob}</ThemedText>
        <ThemedText style={styles.field}>RFID Tag: {animal.rfid_tag}</ThemedText>
        <ThemedText style={styles.field}>Initial Weight: {animal.initialWeight} kg</ThemedText>
        <ThemedText style={styles.field}>Health Status: {animal.initialHealthStatus}</ThemedText>
        <ThemedText style={styles.field}>Gender: {animal.gender}</ThemedText>
        <ThemedText style={styles.field}>Origin: {animal.origin}</ThemedText>
        <ThemedText style={styles.field}>Purchase Date: {animal.purchaseDate}</ThemedText>
        <ThemedText style={styles.field}>Purpose: {animal.purpose}</ThemedText>
        <ThemedText style={styles.field}>Owner: {animal.owner}</ThemedText>
        <ThemedText style={styles.field}>Species: {animal.species}</ThemedText>
        <ThemedText style={styles.field}>Age: {animal.age} years</ThemedText>
        <ThemedText style={styles.field}>Count: {animal.count}</ThemedText>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <ThemedText style={styles.buttonText}>Edit</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <ThemedText style={styles.buttonText}>Delete</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default AnimalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
  },
  detailsContainer: {
    backgroundColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  title: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_12,
  },
  field: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryDarkGreyHex,
    marginBottom: SPACING.space_8,
  },
  notFoundText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryRedHex,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.space_20,
  },
  editButton: {
    backgroundColor: COLORS.primaryBlueHex,
    borderRadius: BORDERRADIUS.radius_8,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_20,
  },
  deleteButton: {
    backgroundColor: COLORS.primaryRedHex,
    borderRadius: BORDERRADIUS.radius_8,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_20,
  },
  buttonText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
  },
});
