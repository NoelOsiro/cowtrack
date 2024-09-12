import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import useCategoryStore from '@/store/useCategoryStore'; // Update this import path based on your structure
import CategoryItem from './CategoryItem'; // Assuming this component exists
import { Category } from '@/constants/categoriesData'; // Update this import path based on your structure
import { icons } from '@/constants';

interface CategoryListProps {
    onSelectCategory: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {

    const { categories,setSelectedCategory} = useCategoryStore();
    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.listView} // Hide the scroll bar
        >
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <CategoryItem
                        item={item}
                        onSelect={handleSelectCategory}
                    />
                )}
                keyExtractor={(item: Category) => `${item.id}`}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        padding: 10,
        maxHeight: 500,
    },
    flatListContent: {

        alignItems: 'stretch', // Center items vertically
        paddingVertical: 10,
    },
});

export default CategoryList;
