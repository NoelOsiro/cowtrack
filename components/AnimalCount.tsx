import { SIZES, COLORS, FONTS, icons } from "@/constants";
import React from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';
import { Category, Animal } from "../constants/categoriesData";
import { renderIncomingAnimalsTitle } from "../app/home";


// Interface for props
interface IncomingAnimalsProps {
    selectedCategory: Category | null;
}

// Component for rendering incoming expenses
export const FarmPopulation = ({ selectedCategory }: IncomingAnimalsProps) => {
    // Filter the animals based on health status
    const allAnimals = selectedCategory ? selectedCategory.animals : [];
    // const incomingExpenses = allAnimals.filter((a: { healthStatus: string; }) => a.healthStatus === "H");
    const incomingAnimals = allAnimals


    // Render item for the FlatList
    const renderItem = ({ item, index }: { item: Animal; index: number }) => (
        <View style={[
            styles.itemContainer,
            {
                marginLeft: index === 0 ? SIZES.padding : 0,
            }
        ]}>
            {/* Title */}
            <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={selectedCategory?.icon}
                        style={[styles.icon, { tintColor: selectedCategory?.color }]}
                    />
                </View>
                <Text style={[FONTS.h3, { color: selectedCategory?.color }]}>{selectedCategory?.name}</Text>
            </View>

            {/* Expense Description */}
            <View style={styles.descriptionContainer}>
                <Text style={FONTS.h2}>{item.animalType}</Text>
                <Text style={[FONTS.body3, { color: COLORS.darkgray }]}>{item.breed}</Text>
                <Text style={FONTS.h4}>Location</Text>
                <View style={styles.locationContainer}>
                    <Image
                        source={icons.pin}
                        style={[styles.pinIcon, { tintColor: COLORS.darkgray }]}
                    />
                    <Text style={[FONTS.body4, { color: COLORS.darkgray }]}>{item.location}</Text>
                </View>
            </View>

            {/* Price */}
            <View style={[styles.priceContainer, { backgroundColor: selectedCategory?.color }]}>
                <Text style={[FONTS.body3, { color: COLORS.white }]}>CONFIRM {item.count.toFixed(2)} USD</Text>
            </View>
        </View>
    );

    return (
        <View>
            {renderIncomingAnimalsTitle()}

            {incomingAnimals.length > 0 ? (
                <FlatList
                    data={incomingAnimals}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <View style={styles.noRecordContainer}>
                    <Text style={[FONTS.h3, { color: COLORS.primary }]}>No Record</Text>
                </View>
            )}
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    itemContainer: {
        width: 300,
        marginRight: SIZES.padding,
        marginVertical: SIZES.radius,
        borderRadius: SIZES.radius,
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
    titleContainer: {
        flexDirection: 'row',
        padding: SIZES.padding,
        alignItems: 'center',
    },
    iconContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZES.base
    },
    icon: {
        width: 30,
        height: 30,
    },
    descriptionContainer: {
        paddingHorizontal: SIZES.padding
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pinIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    priceContainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: SIZES.radius,
        borderBottomEndRadius: SIZES.radius
    },
    noRecordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300
    }
});
