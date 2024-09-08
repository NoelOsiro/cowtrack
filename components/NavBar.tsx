import { SIZES, COLORS, icons, FONTS } from "@/constants";
import { useNavigation } from "expo-router";
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';



function AddCategory() {
    return (
        <View style={navbarStyles.dropdown}>
            <TouchableOpacity style={navbarStyles.dropdownItem} onPress={() => console.log('Option 1')}>
                <Text style={navbarStyles.dropdownText}>Add Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={navbarStyles.dropdownItem} onPress={() => console.log('Option 2')}>
                <Text style={navbarStyles.dropdownText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={navbarStyles.dropdownItem} onPress={() => console.log('Option 3')}>
                <Text style={navbarStyles.dropdownText}>Option 3</Text>
            </TouchableOpacity>
        </View>
    );
}


export const NavBar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigation = useNavigation();

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    return (
        <View style={navbarStyles.container}>
            {/* Back button */}
            <TouchableOpacity
                style={navbarStyles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.back_arrow}
                    style={navbarStyles.icon}
                />
            </TouchableOpacity>

            {/* More button */}
            <TouchableOpacity
                style={navbarStyles.moreButton}
                onPress={toggleDropdown}
            >
                <Image
                    source={icons.more}
                    style={navbarStyles.icon}
                />
            </TouchableOpacity>

            {/* Dropdown menu */}
            {isDropdownVisible && (
                <AddCategory></AddCategory>
            )}
        </View>
    );
};


const navbarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingBottom: 10,
        position: 'relative', 
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
    dropdown: {
        position: 'absolute',
        top: 80, 
        right: 0,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: 150, 
        zIndex: 10, 
    },
    dropdownItem: {
        padding: SIZES.base,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
    },
    dropdownText: {
        ...FONTS.body3,
        color: COLORS.primary,
    },
});
