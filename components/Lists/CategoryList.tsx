import { SIZES, COLORS, FONTS, icons } from "@/constants";
import React from 'react';
import { View, Image, Animated, FlatList, Text, StyleSheet, Pressable } from 'react-native';


// Define the type for the icons keys
type IconKeys = keyof typeof icons;

// Extend the Category interface to include the icon property with the correct type
interface Category {
    id: number;
    name: string;
    icon: IconKeys;
    color: string;
}

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
    const renderItem = (item :Category,index:number ) => (
        <Pressable
        key={index}
            onPress={() => setSelectedCategory(item)}
            style={styles.itemContainer}
        >
            <Image
                source={icons[item.icon]}
                style={[styles.icon, { tintColor: item.color }]}
            />
            <Text style={styles.itemText}>{item.name}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, { height: categoryListHeightAnimationValue }]}>

            <View style={styles.categoryContainer}>
                    {categories.map((item,index) => renderItem(item,index))}
                </View>
            </Animated.View>

            <Pressable
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
            </Pressable>
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
    categoryContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    itemContainer: {
        width: '48%', // Adjust for two columns
        flexDirection: 'row',
        margin: 5,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        justifyContent: 'center',
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
