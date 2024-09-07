import { SIZES, COLORS, FONTS, icons } from "@/constants";
import React from 'react';
import { View, Image, Animated, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from "./categoriesData";

// Interface for props
interface CategoryListProps {
    categories: Category[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
    categoryListHeightAnimationValue: Animated.Value;
    showMoreToggle: boolean;
    setShowMoreToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component for rendering the category list
export const CategoryList = ({
    categories, 
    setSelectedCategory, 
    categoryListHeightAnimationValue, 
    showMoreToggle, 
    setShowMoreToggle
}: CategoryListProps) => {
    // Render item for the FlatList
    const renderItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            style={styles.itemContainer}
        >
            <Image
                source={item.icon}
                style={[styles.icon, { tintColor: item.color }]}
            />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, { height: categoryListHeightAnimationValue }]}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item: Category) => `${item.id}`}
                    numColumns={2}
                    contentContainerStyle={styles.flatListContent}
                />
            </Animated.View>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => {
                    const newHeight = showMoreToggle ? 145 : 182.5;
                    Animated.timing(categoryListHeightAnimationValue, {
                        toValue: newHeight,
                        duration: 200,
                        useNativeDriver: false
                    }).start();
                    setShowMoreToggle(!showMoreToggle);
                }}
            >
                <Text style={FONTS.body4}>{showMoreToggle ? "LESS" : "MORE"}</Text>
                <Image
                    source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                    style={styles.toggleIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.padding - 5,
    },
    animatedContainer: {
        // Initial height set by the Animated.Value
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
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
    flatListContent: {
        alignItems: 'center', // Center items vertically
        paddingVertical: 10,
    },
    toggleButton: {
        flexDirection: 'row',
        marginVertical: SIZES.base,
        justifyContent: 'center'
    },
    toggleIcon: {
        marginLeft: 5,
        width: 15,
        height: 15,
        alignSelf: 'center'
    },
    
});
