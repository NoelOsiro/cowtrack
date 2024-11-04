import { StyleSheet, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useAnimalStore } from '@/store/useAnimalstore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING, FONTSIZE, BORDERRADIUS, FONTFAMILY } from '@/constants/theme';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { InfoCard } from '@/components/animals/Infocard';
import DeleteModal from '@/components/animals/DeleteModal';
import EditModal from '@/components/animals/EditModal';
import { Animal, EditableFields } from '@/constants/types';

type Props = {};


const AnimalDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { animals, deleteAnimal,updateAnimal } = useAnimalStore();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editableFields, setEditableFields] = useState<EditableFields>({});
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const animal = animals.find((animal) => animal.id === id);

  if (!animal) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.notFoundText}>Animal not found</ThemedText>
      </View>
    );
  }

  const handleEditIconPress = (cardData: EditableFields) => {
    setEditableFields(cardData);
    setEditModalVisible(true);
  };

  const onSave = () => {
    const sanitizedFields = Object.keys(editableFields).reduce((acc: EditableFields, key) => {
      // Set empty string for undefined values and include only non-undefined entries
      if (editableFields[key as keyof EditableFields] !== undefined) {
        acc[key as keyof EditableFields] = editableFields[key as keyof EditableFields] ?? '';
      }
      return acc;
    }, {} as EditableFields);
  
    updateAnimal({
      ...animal,             // Existing fields of the animal
      ...sanitizedFields,    // Only the sanitized fields that were edited
    });
  
    console.log(sanitizedFields); // Debugging to see sanitized fields
    setEditModalVisible(false);
  };

  const handleDelete = () => {
    deleteAnimal(animal.id);
    setDeleteModalVisible(false);
  };

  const openEditModal = (fields: EditableFields) => setEditableFields(fields);
  return (
    <ThemedScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <Stack.Screen options={{ title: animal.name }} />

      {/* General Info Card */}
      <InfoCard
        title="General Information"
        fields={[
          { label: 'Origin', value: animal.origin },
          { label: 'Purchase Date', value: animal.purchaseDate },
          { label: 'Purpose', value: animal.purpose },
          { label: 'Owner', value: animal.owner },
        ]}
        onEditPress={() => handleEditIconPress({ origin: animal.origin, purchaseDate: animal.purchaseDate, purpose: animal.purpose, owner: animal.owner })}
        backgroundColors={['#37474f', '#263238']}
      />

      {/* Identification Card */}
      <InfoCard
        title="Identification"
        fields={[
          { label: 'Name', value: animal.name },
          { label: 'RFID Tag', value: animal.rfid_tag },
          { label: 'Breed', value: animal.breed },
        ]}
        onEditPress={() => handleEditIconPress({ name: animal.name, rfid_tag: animal.rfid_tag, breed: animal.breed })}
        backgroundColors={['#2e2e2e', '#0a74da']}
      />


      {/* Health Card */}
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={['#3f0e40', '#1c1c1c']} // Replace with your color codes
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <ThemedText style={styles.cardHeader}>Health</ThemedText>
          <ThemedText style={styles.field}>Health Status: {animal.initialHealthStatus}</ThemedText>
          <ThemedText style={styles.field}>DOB: {animal.dob}</ThemedText>
          <ThemedText style={styles.field}>Initial Weight: {animal.initialWeight} kg</ThemedText>
          <TouchableOpacity style={styles.editIcon} onPress={() => handleEditIconPress({ initialHealthStatus: animal.initialHealthStatus, dob: animal.dob, initialWeight: animal.initialWeight })}>
            <FontAwesome name="edit" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
        
        {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={()=>setDeleteModalVisible(true)}>
          <ThemedText style={styles.buttonText}>Delete</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />

      {/* Edit Modal */}
      <EditModal
        visible={isEditModalVisible}
        fields={editableFields}
        onSave={onSave}
        onClose={() => setEditModalVisible(false)}
        onChange={(callback) => setEditableFields(callback)}
      />
    </ThemedScrollView>
  );
};

export default AnimalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
  },
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_10,
    overflow: 'hidden',
    marginBottom: SPACING.space_20,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.space_20,
  },
  cardHeader: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryOrangeHex,
    marginBottom: SPACING.space_12,
  },
  field: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
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
    marginTop: SPACING.space_10,
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
  editIcon: {
    position: 'absolute',
    bottom: SPACING.space_10,
    right: SPACING.space_10,
  },
});

