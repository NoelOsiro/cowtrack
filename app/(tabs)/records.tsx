import ActionButtons from '@/components/ActionButtons';
import AnimalCountCard from '@/components/AnimalCountCard';
import RecentChangesCard from '@/components/RecentChangesCard';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { animalCategories, recentChanges } from '@/constants/mockdata';
import { ThemedScrollView } from '@/components/ThemedScrollView';

interface AnimalRecord {
    id: string;
    name: string;
    species: string;
    age: number;
}

const animalRecords: AnimalRecord[] = [
    { id: '1', name: 'Bessie', species: 'Cow', age: 4 },
    { id: '2', name: 'MooMoo', species: 'Cow', age: 2 },
    { id: '3', name: 'Daisy', species: 'Cow', age: 3 },
];

const RecordsScreen: React.FC = () => {
    const renderItem = ({ item }: { item: AnimalRecord }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.species}</Text>
            <Text>{item.age} years old</Text>
        </View>
    );

    return (
        <ThemedScrollView style={styles.container}>
            <FlatList
                data={animalRecords}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <AnimalCountCard data={animalCategories} />
          <RecentChangesCard data={recentChanges} />
          <ActionButtons />
        </ThemedScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RecordsScreen;