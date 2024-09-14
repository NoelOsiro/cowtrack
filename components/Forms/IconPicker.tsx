import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS, SIZES } from '@/constants';  // Import animalIcons directly
import { FormikErrors, FormikTouched } from 'formik';
import { animalIcons } from '@/constants/icons';

interface IconPickerProps {
    values: { icon: string };
    errors: FormikErrors<{ icon: string }>;
    touched: FormikTouched<{ icon: string }>;
    handleBlur: (field: string) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    animateInput: (focus: boolean) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ values, errors, touched, handleBlur, setFieldValue, animateInput }) => {
    return (
        <>
            <Text style={styles.label}>Icon</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={values.icon}
                    onValueChange={(itemValue) => setFieldValue('icon', itemValue)}
                    onFocus={() => animateInput(true)}
                    onBlur={() => {
                        handleBlur('icon');
                        animateInput(false);
                    }}
                    style={[styles.picker, touched.icon && errors.icon ? styles.inputError : null]}
                >
                    <Picker.Item label="Select an icon" value="" />
                    {Object.keys(animalIcons).map((key) => (
                        <Picker.Item
                            key={key}
                            label={key}  // Format the key by replacing underscores with spaces
                            value={key}  // The key will be used as the value
                        />
                    ))}
                </Picker>
            </View>
            {touched.icon && errors.icon && <Text style={styles.errorText}>{errors.icon}</Text>}
        </>
    );
};

export default IconPicker;

const styles = StyleSheet.create({
    label: {
        color: COLORS.primary,
        ...FONTS.h3,
        marginBottom: SIZES.base / 2,
    },
    pickerContainer: {
        height: 45,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.base / 2,
        backgroundColor: COLORS.lightGray2,
        transform: [{ scale: 1 }],
    },
    picker: {
        height: 45,
        width: '100%',
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
