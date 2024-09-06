import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format  } from 'date-fns';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import PieChart from '@/components/PieChart';


const data = [
  { label: 'Category 1', value: 30, icon: 'airplane', color: 'red' },
  { label: 'Category 2', value: 50, icon: 'car', color: 'blue' },
  { label: 'Category 3', value: 20, icon: 'train', color: 'green' },
];
export default function DetailsScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>{format(currentDate, 'dd MMM yyyy')}</ThemedText>
      <PieChart data={data} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: 'SpaceMono',
  },
});
