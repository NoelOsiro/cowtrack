import React, { useEffect } from 'react';
import { View, StyleSheet, Animated,Text } from 'react-native';
import useCategoryStore from '@/store/useCategoryStore'; // Update this import path based on your project structure

import { Animal, Category } from '@/constants/categoriesData'; // Update this import path based on your project structure
import { COLORS, FONTS, icons } from '@/constants'; // Update this import path based on your project structure
import CategoryList from '../Category/CategoryList';
import CategoryToggleButton from '../Category/CategoryToggleButton';
import EditCategory from '../Forms/EditCatgeoryForm';
import Toast from 'react-native-root-toast';
import { animalIcons } from '@/constants/icons';

const EditCategoryList = () => {
    const {
        categories,
        selectedCategory,
        showMoreToggle,
        categoryName,
        categoryColor,
        categoryIcon,
        updateCategory,
        setCategories,
        setSelectedCategory,
        setShowMoreToggle,
        setCategoryName,
        setCategoryColor,
        setCategoryIcon,
        loadCategories
    } = useCategoryStore();

    const categoryListHeightAnimationValue = new Animated.Value(200);


    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setCategoryName(category.name);
        setCategoryColor(category.color);
        setCategoryIcon(category.icon.name);
    };

    const handleSaveCategory = async ( name: string, icon: string, color: string,animals:Animal[] ): Promise<void> => {
        // genereate id from uuid
        let id = Math.random().toString(36).substring(7);
        const iconKey = animalIcons[icon as keyof typeof animalIcons];

        const data: Category = {
            id: selectedCategory?.id || id,
            name: name,
            breeds:[],
            icon: iconKey ,
            color: color,
            animals: [],
        };
        console.log(data)
        updateCategory(data)
            .then(() => {
                Toast.show('Category Added successfully', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP,
                    backgroundColor: COLORS.primary,
                });
            })
            .catch((error) => {
                console.error('Error adding category:', error);
                Toast.show('Error adding category', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP,
                    backgroundColor: COLORS.red,
                });
            });
    }


    return (
        <View style={styles.container}>
            <CategoryList
                onSelectCategory={handleSelectCategory}
            />
            {selectedCategory ? (
            <EditCategory
                onSave={handleSaveCategory}

            />
        ) : (
            <View style={styles.noRecordContainer}>
                <Text style={[FONTS.h3, { color: COLORS.primary }]}>Choose a category</Text>
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    noRecordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
      },
});

export default EditCategoryList;
