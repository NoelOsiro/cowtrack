// components/InfoCard.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING, FONTSIZE, BORDERRADIUS } from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';

type InfoCardProps = {
  title: string;
  fields: { label: string; value: string | number }[];
  onEditPress: () => void;
  backgroundColors: string[];
};

export const InfoCard = ({ title, fields, onEditPress, backgroundColors }: InfoCardProps) => (
  <View style={styles.cardContainer}>
    <LinearGradient colors={backgroundColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <ThemedText style={styles.cardHeader}>{title}</ThemedText>
      {fields.map((field, index) => (
        <ThemedText key={index} style={styles.field}>
          {field.label}: {field.value}
        </ThemedText>
      ))}
      <TouchableOpacity style={styles.editIcon} onPress={onEditPress}>
        <FontAwesome name="edit" size={24} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_10,
    overflow: 'hidden',
    marginBottom: SPACING.space_20,
  },
  card: {
    padding: SPACING.space_20,
    justifyContent: 'center',
  },
  cardHeader: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
    marginBottom: SPACING.space_12,
  },
  field: {
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_8,
  },
  editIcon: {
    position: 'absolute',
    bottom: SPACING.space_10,
    right: SPACING.space_10,
  },
});
