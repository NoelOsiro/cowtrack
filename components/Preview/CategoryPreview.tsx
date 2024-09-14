import { COLORS, SIZES, FONTS } from "@/constants";
import { animalIcons } from "@/constants/icons";
import { Pressable, Text, StyleSheet } from "react-native";

export default function renderCategoryPreview() {
    return (values: { name: string; icon: keyof typeof animalIcons; color: string; }) => {
        const selectedIcon = animalIcons[values.icon]; // Get the selected icon object
        const IconComponent = selectedIcon?.library;
        const iconName = selectedIcon?.name; // Get the icon name
        const color = values.color || COLORS.primary; // Default color

        if (!IconComponent || !iconName) {
            return null; // Return null if icon is not found
        }

        return (
            <Pressable style={styles.itemContainer}>
                {/* Render the Icon from the correct library */}
                <IconComponent name={iconName as any} size={30} color={color} style={styles.icon} />
                <Text style={styles.itemText}>{values.name || 'Category Name'}</Text>
            </Pressable>
        );
    };
}

const styles = StyleSheet.create({   
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        alignItems: 'center',
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: SIZES.body1,
    },
    itemText: {
        color: COLORS.primary,
        ...FONTS.h2,
    },
});