import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { FONTS, icons, SIZES } from '@/constants';

interface CategoryToggleButtonProps {
    showMoreToggle: boolean;
    onToggle: () => void;
}

const CategoryToggleButton: React.FC<CategoryToggleButtonProps> = ({ showMoreToggle, onToggle }) => (
    <TouchableOpacity
        style={styles.toggleButton}
        onPress={onToggle}
    >
        <Text style={FONTS.body4}>{showMoreToggle ? "LESS" : "MORE"}</Text>
        <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={styles.toggleIcon}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default CategoryToggleButton;
