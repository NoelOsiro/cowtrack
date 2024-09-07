import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SIZES, COLORS, FONTS } from "@/constants";
import { setSelectCategoryByName } from "../app/home";
import { processCategoryDataToDisplay } from "./processCategoryDataToDisplay";
import { Category } from '@/constants/categoriesData';


interface FarmSummaryProps {
    selectedCategory: any;
    categories: Category[];
    setSelectedCategory: (arg0: any) => void;
}

export function FarmSummary({ selectedCategory, categories, setSelectedCategory }: FarmSummaryProps) {
    const data = processCategoryDataToDisplay(categories);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
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
                    Count: {item.y}  - {item.label}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
            />
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
