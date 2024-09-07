import { SIZES, COLORS, FONTS, icons } from "@/constants";
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// Render the header component
export const Header = ()=> {
    return (
        <View style={headerStyles.container}>
            {/* Header Title */}
            <View>
                <Text style={headerStyles.title}>My Farm</Text>
                <Text style={headerStyles.subtitle}>Summary (private)</Text>
            </View>

            {/* Date and Icon Section */}
            <View style={headerStyles.dateSection}>
                <View style={headerStyles.iconContainer}>
                    <Image
                        source={icons.calendar}
                        style={headerStyles.icon}
                    />
                </View>

                <View style={headerStyles.dateInfo}>
                    <Text style={headerStyles.date}>11 Nov, 2020</Text>
                    <Text style={headerStyles.info}>18% more than last month</Text>
                </View>
            </View>
        </View>
    );
};

// Styles for the header component
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
    },
    subtitle: {
        ...FONTS.h3,
        color: COLORS.darkgray,
    },
    dateSection: {
        flexDirection: 'row',
        marginTop: SIZES.padding,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: COLORS.lightGray,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: COLORS.lightBlue,
    },
    dateInfo: {
        marginLeft: SIZES.padding,
    },
    date: {
        color: COLORS.primary,
        ...FONTS.h3,
    },
    info: {
        ...FONTS.body3,
        color: COLORS.darkgray,
    },
});
