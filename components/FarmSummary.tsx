import React from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { SIZES, COLORS, FONTS } from "@/constants";

import { processCategoryDataToDisplay } from "./processCategoryDataToDisplay";
import { Category } from '@/constants/categoriesData';
import { setSelectCategoryByName } from '@/utils/setSelectCategoryByName';


interface FarmSummaryProps {
    selectedCategory: any;
    categories: Category[];
    setSelectedCategory: (arg0: any) => void;
}

export function FarmSummary({ selectedCategory, categories, setSelectedCategory }: FarmSummaryProps) {
    const data = processCategoryDataToDisplay(categories);

    const renderItem = ({ item,index }: { item: any,index:any }) => (
        <Pressable
        key={index}
            style={[
                styles.itemContainer,
                { backgroundColor: (selectedCategory && selectedCategory.name === item.name) ? item.color : COLORS.white }
            ]}
            onPress={() => {
                const categoryName = item.name;
                setSelectCategoryByName(categoryName, categories, setSelectedCategory);
            }}
        >
            <View style={styles.itemContent}>
                <View
                    style={[
                        styles.colorIndicator,
                        { backgroundColor: (selectedCategory && selectedCategory.name === item.name) ? COLORS.white : item.color }
                    ]}
                />
                <Text style={[
                    styles.itemText,
                    { color: (selectedCategory && selectedCategory.name === item.name) ? COLORS.white : COLORS.primary }
                ]}>
                    {item.name}
                </Text>
            </View>
            <View style={styles.expensesContainer}>
                <Text style={[
                    styles.expensesText,
                    { color: (selectedCategory && selectedCategory.name === item.name) ? COLORS.white : COLORS.primary }
                ]}>
                    Count: {item.count}  - {item.label}
                </Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {data.map((item,index) => (
                renderItem({ item, index})
            ))}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.padding,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: SIZES.radius,
        borderRadius: 10,
        marginVertical: SIZES.base / 2, // Optional spacing between items
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorIndicator: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
    itemText: {
        marginLeft: SIZES.base,
        ...FONTS.h3,
    },
    expensesContainer: {
        justifyContent: 'center',
    },
    expensesText: {
        ...FONTS.h3,
    },
});
