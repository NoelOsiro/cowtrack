import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS, SIZES } from '@/constants';
import { FormikErrors, FormikTouched } from 'formik';

interface ColorPickerProps {
    values: { color: string };
    errors: FormikErrors<{
        name: string;
        color: any;
        icon: any;
    }>
    touched: FormikTouched<{
        name: string;
        color: any;
        icon: any;
    }>
    handleBlur: (field: string) => void;
    setFieldValue: (field: string, value: any) => void;
    animateInput: (focus: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ values, errors, touched, handleBlur, setFieldValue, animateInput }) => {
    return (
        <View>
            <Text style={styles.label}>Color</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={values.color}
                    onValueChange={(itemValue) => setFieldValue('color', itemValue)}
                    onFocus={() => animateInput(true)}
                    onBlur={() => {
                        handleBlur('color');
                        animateInput(false);
                    }}
                    style={[styles.picker, touched.color && errors.color ? styles.inputError : null]}
                >
                    <Picker.Item label="Select a color" value="" />
                    {Object.keys(COLORS).map((key) => (
                        <Picker.Item
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={COLORS[key]}
                        />
                    ))}
                </Picker>
                {touched.color && typeof errors.color === 'string' && <Text style={styles.errorText}>{errors.color}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: COLORS.primary,
        ...FONTS.h3,
        marginBottom: SIZES.base / 2,
    },
    pickerContainer: {
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        backgroundColor: COLORS.lightGray2,
        marginBottom: SIZES.base / 2,
    },
    picker: {
        height: 45,
        color: COLORS.black,
        paddingHorizontal: SIZES.base,
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

export default ColorPicker;