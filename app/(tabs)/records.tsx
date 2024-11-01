import ActionButtons from '@/components/ActionButtons';
import AnimalCountCard from '@/components/AnimalCountCard';
import RecentChangesCard from '@/components/RecentChangesCard';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native';
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
        <Animated.View style={[styles.item, { opacity: 1, transform: [{ scale: 1 }] }]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.species}>{item.species}</Text>
            <Text style={styles.age}>{item.age} years old</Text>
        </Animated.View>
    );

    return (
        <ThemedScrollView style={styles.container}>
            <FlatList
                data={animalRecords}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
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
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        paddingBottom: 16,
    },
    item: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderColor: '#d1d1d1',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    species: {
        fontSize: 16,
        color: '#555',
    },
    age: {
        fontSize: 16,
        color: '#999',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    buttonContainer: {
        padding: 12,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default RecordsScreen;
