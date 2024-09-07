import { SIZES, COLORS, FONTS, icons } from "@/constants";
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Category } from "./categoriesData";

// Interface for props
interface HeaderSectionProps {
    categories: Category[];
    viewMode: string;
    setViewMode: React.Dispatch<React.SetStateAction<string>>;
}



// Render category header section
export function CategoryHeaderSection({
    categories,
    viewMode,
    setViewMode
}: HeaderSectionProps){
    const buttons = [
        {
            mode: "chart",
            icon: icons.chart,
            tintColor: viewMode === "chart" ? COLORS.white : COLORS.darkgray,
        },
        {
            mode: "list",
            icon: icons.menu,
            tintColor: viewMode === "list" ? COLORS.white : COLORS.darkgray,
            marginLeft: SIZES.base,
        }
    ];
    return (
        <View style={styles.headerContainer}>
            {/* Title */}
            <View>
                <Text style={styles.title}>CATEGORIES</Text>
                <Text style={styles.subTitle}>{categories.length} Total</Text>
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
            {buttons.map(({ mode, icon, tintColor, marginLeft }) => (
                    <TouchableOpacity
                        key={mode}
                        style={[
                            styles.iconButton,
                            { backgroundColor: viewMode === mode ? COLORS.secondary : COLORS.lightGray },
                            marginLeft ? { marginLeft } : null,
                        ]}
                        onPress={() => setViewMode(mode)}
                    >
                        <Image
                            source={icon}
                            resizeMode="contain"
                            style={[
                                styles.iconImage,
                                { tintColor }
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

// Styles for the component
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        padding: SIZES.padding,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: COLORS.primary,
        ...FONTS.h3,
    },
    subTitle: {
        color: COLORS.darkgray,
        ...FONTS.body4,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    marginLeftBase: {
        marginLeft: SIZES.base,
    },
});
