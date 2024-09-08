import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Category } from '@/constants/categoriesData';
import { COLORS, FONTS, SIZES } from '@/constants';
import useCategoryStore from '@/store/useCategoryStore';

interface CategoryItemProps {
    item: Category;
    onSelect: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onSelect }) => {
    const { setSelectedCategory } = useCategoryStore();
    return (
    
    <Pressable
        onPress={() => setSelectedCategory(item)}
        style={styles.itemContainer}
    >
        <Image
            source={item.icon}
            style={[styles.icon, { tintColor: item.color }]}
        />
        <Text style={styles.itemText}>{item.name}</Text>
    </Pressable>
)};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.lightGray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    icon: {
        width: 20,
        height: 20,
    },
    itemText: {
        marginLeft: SIZES.base,
        color: COLORS.primary,
        ...FONTS.h4
    },
});

export default CategoryItem;
