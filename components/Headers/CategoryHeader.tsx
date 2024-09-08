import { SIZES, COLORS, FONTS } from "@/constants";
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

interface CategoryHeaderProps {
    onAddCategory: () => void;
    onEditCategory: () => void;
    title: string;
    subtitle: string;
}

export const CategoryHeader = (props:CategoryHeaderProps) => {
    const { onAddCategory, onEditCategory, title, subtitle } = props;
    return (
        <View style={headerStyles.container}>
            {/* Header Title */}
            <View>
                <Text style={headerStyles.title}>{title}</Text>
                <Text style={headerStyles.subtitle}>{subtitle}</Text>

                {/* Category Section */}
                <View style={headerStyles.categoryContainer}>
                    {/* Add and Edit Buttons */}
                    <TouchableOpacity
                        style={headerStyles.button}
                        onPress={onAddCategory}
                    >
                        <Ionicons name="add-circle-outline" size={20} color={COLORS.white} style={headerStyles.buttonIcon} />
                        <Text style={headerStyles.buttonText}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={headerStyles.button}
                        onPress={onEditCategory}
                    >
                        <Ionicons name="pencil-outline" size={20} color={COLORS.white} style={headerStyles.buttonIcon} />
                        <Text style={headerStyles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const headerStyles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
        zIndex: 1,
    },
    title: {
        color: COLORS.primary,
        ...FONTS.h2,
        marginBottom: SIZES.base,
    },
    subtitle: {
        ...FONTS.h3,
        color: COLORS.darkgray,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.base,
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        width: '45%', // Adjust the width to your preference
    },
    buttonIcon: {
        marginRight: SIZES.base,
    },
    buttonText: {
        color: COLORS.white,
        ...FONTS.h4,
    },
});

