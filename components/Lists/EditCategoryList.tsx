import React from 'react';
import { View, StyleSheet, Animated,Text } from 'react-native';
import useCategoryStore from '@/store/useCategoryStore'; // Update this import path based on your project structure

import { Category } from '@/constants/categoriesData'; // Update this import path based on your project structure
import { COLORS, FONTS, icons } from '@/constants'; // Update this import path based on your project structure
import CategoryList from '../Category/CategoryList';
import CategoryToggleButton from '../Category/CategoryToggleButton';
import EditCategory from '../Forms/EditCatgeoryForm';

const EditCategoryList = () => {
    const {
        categories,
        selectedCategory,
        showMoreToggle,
        categoryName,
        categoryColor,
        categoryIcon,
        setCategories,
        setSelectedCategory,
        setShowMoreToggle,
        setCategoryName,
        setCategoryColor,
        setCategoryIcon
    } = useCategoryStore();

    const categoryListHeightAnimationValue = new Animated.Value(145);

    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setCategoryName(category.name);
        setCategoryColor(category.color);
        setCategoryIcon(Object.keys(icons).find(iconKey => icons[iconKey] === category.icon) || '');
    };

    const handleSaveCategory = () => {
        if (selectedCategory) {
            const updatedCategories = categories.map(cat =>
                cat.id === selectedCategory.id
                    ? { ...cat, name: categoryName, color: categoryColor, icon: icons[categoryIcon as keyof typeof icons] }
                    : cat
            );
            setCategories(updatedCategories);
        } else {
            const newCategory: Category = {
                id: categories.length + 1,
                name: categoryName,
                icon: icons[categoryIcon as keyof typeof icons],
                color: categoryColor,
                animals: [],
            };
            setCategories([...categories, newCategory]);
        }
        setSelectedCategory(null);
    };

    const handleCancel = () => {
        setSelectedCategory(null);
    };

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
        height: 300,
      },
});

export default EditCategoryList;
