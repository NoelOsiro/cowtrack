import { SIZES, COLORS, icons } from "@/constants";
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Render the navigation bar component
export const NavBar = () => {
    return (
        <View style={navbarStyles.container}>
            {/* Back button */}
            <TouchableOpacity
                style={navbarStyles.backButton}
                onPress={() => console.log('Go Back')}
            >
                <Image
                    source={icons.back_arrow}
                    style={navbarStyles.icon}
                />
            </TouchableOpacity>

            {/* More button */}
            <TouchableOpacity
                style={navbarStyles.moreButton}
                onPress={() => console.log('More')}
            >
                <Image
                    source={icons.more}
                    style={navbarStyles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

// Styles for the navigation bar
const navbarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingBottom: 10,
    },
    backButton: {
        justifyContent: 'center',
        width: 50,
    },
    moreButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 50,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: COLORS.primary,
    },
});
