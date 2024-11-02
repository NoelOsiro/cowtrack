import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SPACING, COLORS, BORDERRADIUS, FONTSIZE } from '@/constants/theme';
import { Animal } from '@/constants/types';
import { useAuthStore } from '@/store/authStore';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import { useAnimalStore } from '@/store/useAnimalstore';

const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
const width = Dimensions.get('window').width;

const Dashboard = () => {
  const { animals, fetchAnimals } = useAnimalStore();
  const user = useAuthStore((state) => state.user);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAnimals(user.uid).then(() => setIsFetched(true)); // Mark as fetched when animals are loaded
    }
  }, [user]);

  // Summary calculations
  const totalAnimals = animals.length;
  const maleAnimals = animals.filter((animal) => animal.gender === 'Male').length;
  const femaleAnimals = animals.filter((animal) => animal.gender === 'Female').length;
  const uniqueSpecies = [...new Set(animals.map((animal) => animal.species))];

  // Render function for each animal card
  const renderAnimalCard = ({ item }: { item: Animal }) => (
    <ShimmerPlaceHolder visible={isFetched} shimmerStyle={{borderRadius: BORDERRADIUS.radius_10, marginRight: 10}}  width={190} height={180} >
      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
        <ThemedText style={styles.cardDetails}>Breed: {item.breed}</ThemedText>
        <ThemedText style={styles.cardDetails}>Age: {item.age} years</ThemedText>
        <ThemedText style={styles.cardDetails}>Purpose: {item.purpose}</ThemedText>
      </ThemedView>
    </ShimmerPlaceHolder>
  );

  return (
    <ThemedView style={styles.container}>
      
      {/* Summary Section */}
      <ShimmerPlaceHolder visible={isFetched} shimmerStyle={{borderRadius: BORDERRADIUS.radius_10}}  width={380} height={300}   LinearGradient={LinearGradient}>
      <ThemedView style={styles.summaryContainer}>
        
          <ThemedView style={styles.summaryCard}>
            <ThemedText style={styles.summaryTitle}>Total Animals</ThemedText>
            <ThemedText style={styles.summaryNumber}>{totalAnimals}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryCard}>
            <ThemedText style={styles.summaryTitle}>Male</ThemedText>
            <ThemedText style={styles.summaryNumber}>{maleAnimals}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryCard}>
            <ThemedText style={styles.summaryTitle}>Female</ThemedText>
            <ThemedText style={styles.summaryNumber}>{femaleAnimals}</ThemedText>
          </ThemedView>
        
      </ThemedView>
      </ShimmerPlaceHolder>

      {/* Species Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Species</ThemedText>
        <FlatList
          data={uniqueSpecies}
          renderItem={({ item }) => (
            <ShimmerPlaceHolder visible={isFetched} shimmerStyle={{borderRadius: BORDERRADIUS.radius_10, marginRight:10}}  width={90} height={45}>
              <ThemedText style={styles.species}>{item}</ThemedText>
            </ShimmerPlaceHolder>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.speciesList}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Animal List Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Animals</ThemedText>
        <FlatList
          data={animals}
          renderItem={renderAnimalCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.animalList}
          keyExtractor={(item) => item.id}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_16,
  },
  summaryContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: SPACING.space_20,
    gap: SPACING.space_20,
  },
  summaryCard: {
    backgroundColor: COLORS.primaryBlueHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  summaryNumber: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: SPACING.space_20,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_10,
  },
  speciesList: {
    paddingLeft: SPACING.space_10,
  },
  species: {
    backgroundColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_15,
    fontSize: FONTSIZE.size_14,
    marginRight: SPACING.space_8,
  },
  animalList: {
    paddingLeft: SPACING.space_10,
  },
  card: {
    backgroundColor: COLORS.secondaryGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_16,
    width: 200,
    marginRight: SPACING.space_12,
  },
  cardTitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_8,
  },
  cardDetails: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryWhiteHex,
  },
});
