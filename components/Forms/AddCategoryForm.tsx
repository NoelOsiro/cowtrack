import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated, Image, Pressable } from 'react-native';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SIZES, COLORS, FONTS, icons } from '@/constants';
import { Picker } from '@react-native-picker/picker';
import { saveCategory } from '@/utils/saveCategory';
import useCategoryStore from '@/store/useCategoryStore';
import { Category } from '@/constants/categoriesData';
import { animalIcons } from '@/constants/icons';
import renderCategoryPreview from '../Preview/CategoryPreview';
import CategoryNameInput from './CategoryNameInput';
import IconPicker from './IconPicker';
import ColorPicker from './ColorPicker';


const categorySchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    icon: Yup.string().required('Icon is required'),
    color: Yup.string().required('Color is required'),
});

const AddCategoryForm = () => {
    const [inputAnim] = React.useState(new Animated.Value(1));
    const { categories, addCategory } = useCategoryStore();
    const [loading, setLoading] = useState(false);

    const handleSave = async (values: { name: string; icon: string; color: string }) => {
        setLoading(true);        
        try {
            let id = Math.random().toString(36).substring(2, 9);
            const iconKey = animalIcons[values.icon as keyof typeof animalIcons];
            const data: Category = { id, name: values.name, breeds: [], icon: iconKey, color: values.color, animals: [] };
            
            await addCategory(data);
            Toast.show('Category Added successfully', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                backgroundColor: COLORS.primary,
            });
        } catch (error) {
            Toast.show('Error adding category', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                backgroundColor: COLORS.red,
            });
        } finally {
            setLoading(false);
        }
    };

    const renderPreviewItem = renderCategoryPreview();
    const animateInput = (focus: boolean) => {
        Animated.spring(inputAnim, {
            toValue: focus ? 1.05 : 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };


    return (
        <Formik
            initialValues={{ name: '', icon: '', color: '' }}
            validationSchema={categorySchema}
            onSubmit={handleSave}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.formContainer}>
                    <CategoryNameInput
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                        inputAnim={inputAnim}
                    />


                    <IconPicker
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        animateInput={animateInput}
                    />

                    <ColorPicker
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        animateInput={animateInput}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={() => handleSubmit()} disabled={loading}>
                        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save Category'}</Text>
                    </TouchableOpacity>

                    {/* Preview Section */}
                    <View style={styles.previewContainer}>
                        <Text style={styles.previewTitle}>Preview</Text>
                        {renderPreviewItem({ name: values.name, icon: values.icon as keyof typeof animalIcons, color: values.color })}
                    </View>
                </View>
            )}
        </Formik>
    );
};
// Helper function to render a color label with a square filled with the color
const getColorLabel = (colorName: string, colorValue: string) => (
    <View style={styles.colorItem}>
        <View style={[styles.colorSquare, { backgroundColor: colorValue }]} />
        <Text style={styles.colorName}>{colorName}</Text>
    </View>
);
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        marginVertical: SIZES.base,
        elevation: 3,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
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
        transform: [{ scale: 1 }],
    },
    inputError: {
        borderColor: COLORS.red,
    },
    previewContainer: {
        marginTop: SIZES.padding,
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        shadowColor: COLORS.lightGray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    previewTitle: {
        ...FONTS.h3,
        color: COLORS.primary,
        marginBottom: SIZES.base,
    },
    pickerContainer: {
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
    },
    picker: {
        height: 45,
        color: COLORS.black,
        paddingHorizontal: SIZES.base,
    },
    colorSquare: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderRadius: 5,
    },
    colorName: {
        fontSize: 16,
    },
    colorItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.base,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        marginTop: SIZES.padding,
    },
    saveButtonText: {
        color: COLORS.white,
        ...FONTS.h3,
    },
    errorText: {
        color: COLORS.secondary,
        ...FONTS.h4,
        marginVertical: SIZES.base,
    },
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

export default AddCategoryForm;

