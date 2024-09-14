import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import useCategoryStore from '@/store/useCategoryStore'; // Update this import path based on your structure
import CategoryItem from './CategoryItem'; // Assuming this component exists
import { Category } from '@/constants/categoriesData'; // Update this import path based on your structure

interface CategoryListProps {
  onSelectCategory: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const { categories, setSelectedCategory, loadCategories } = useCategoryStore();

  useEffect(() => {
    // Function to load categories asynchronously
    const loadCategoryData = async () => {
      try {
        await loadCategories(); // Fetch categories from AsyncStorage or DB
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategoryData(); // Call the async function to load categories
  }, [loadCategories]);

  // Handle category selection
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category); // Set selected category in the store
    onSelectCategory(category); // Call the prop method to notify parent
  };

  return (
    <View style={styles.grid}>
      {categories.length > 0 ? (
        categories.map((category,index) => (
          <View key={index} style={styles.itemContainer}>
            <CategoryItem
              item={category}
              onSelect={handleSelectCategory} // Pass selection handler
            />
          </View>
        ))
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row', // Arrange items in rows
    flexWrap: 'wrap', // Wrap to the next line when needed
    justifyContent: 'space-between', // Evenly distribute items horizontally
    paddingHorizontal: 10, // Add padding for the grid
  },
  itemContainer: {
    width: '48%', // Make each item occupy half of the available width (48% allows for some spacing)
    marginBottom: 10, // Add margin between items vertically
  },
});

export default CategoryList;
