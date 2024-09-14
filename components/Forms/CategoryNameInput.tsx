import React from 'react';
import { View, TextInput, Text, Animated, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants';

interface CategoryNameInputProps {
    handleChange: (field: string ) => void;
    handleBlur: (field: string ) => void;
    values: { name: string };
    errors: { name?: string };
    touched: { name?: boolean };
    inputAnim: Animated.Value;
}

const CategoryNameInput: React.FC<CategoryNameInputProps> = ({
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    inputAnim,
}) => {
    return (
        <View style={{paddingHorizontal:SIZES.base}}>
            <Text style={styles.label}>Category Name</Text>
            <Animated.View style={{ transform: [{ scale: inputAnim }] }}>
                <TextInput
                    style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                    placeholder="Enter category name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    onFocus={() => Animated.spring(inputAnim, { toValue: 1.05, useNativeDriver: true }).start()}
                />
            </Animated.View>
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: COLORS.primary,
        ...FONTS.h3,
        marginBottom: SIZES.base / 2,
    },
    input: {
        height: 45,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        backgroundColor: COLORS.lightGray2,
        marginBottom: SIZES.base / 2,
    },
    inputError: {
        borderColor: COLORS.red,
    },
    errorText: {
        color: COLORS.secondary,
        ...FONTS.h4,
        marginVertical: SIZES.base,
    },
});

export default CategoryNameInput;
