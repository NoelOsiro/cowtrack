import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated, Image, FlatList } from 'react-native';
import Toast from 'react-native-root-toast';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { SIZES, COLORS, FONTS, icons } from '@/constants';
import { Picker } from '@react-native-picker/picker';
import useCategoryStore from '@/store/useCategoryStore';
import { Animal, healthyStatus, sickStatus } from '@/constants/categoriesData';

interface FormValues {
    name: string;
    category: string;
    color: string;
    animals: Animal[];
}
const categorySchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    category: Yup.string().required('Category is required'),
    color: Yup.string().required('Color is required'),
    animals: Yup.array().of(
        Yup.object().shape({
            id: Yup.number().required(),
            animalType: Yup.string().required(),
            breed: Yup.string().required(),
            count: Yup.number().required(),
            location: Yup.string().required(),
            healthStatus: Yup.string().required(),
        })
    ),
});

const AddItemForm = () => {
    const { categories, updateAnimalsForCategory, setSelectedCategory } = useCategoryStore();
    const [inputAnim] = React.useState(new Animated.Value(1));
    const [animalBreeds, setAnimalBreeds] = useState<string[]>([]);

    const handleSave = (values: FormValues) => {
        Toast.show('Category Added successfully', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: COLORS.primary,
        });
        console.log('Category Data:', values);
    };

    const animateInput = (focus: boolean) => {
        Animated.timing(inputAnim, {
            toValue: focus ? 1.05 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleCategoryChange = (itemValue: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue('category', itemValue);

        const selectedCategory = categories.find(category => category.id === Number(itemValue));
        setSelectedCategory(selectedCategory!);

        if (selectedCategory) {
            const breeds = selectedCategory.breeds || [];
            setAnimalBreeds(breeds);
            const animals: Animal[] = [
                { id: 1, animalType: "Cow", breed: "Angus", count: 50, location: "Field A", healthStatus: healthyStatus },
                { id: 2, animalType: "Cow", breed: "Holstein", count: 30, location: "Field B", healthStatus: sickStatus }
            ];

            // Update Zustand store with the relevant animal fields
            updateAnimalsForCategory(Number(itemValue), animals);

            // Dynamically set form fields related to animals
            setFieldValue('animals', animals);
        }
    };

    return (
        <Formik<FormValues>
            initialValues={{ name: '', category: '', color: '', animals: [] }}
            validationSchema={categorySchema}
            onSubmit={handleSave}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.formContainer}>
                    {/* Category Picker */}
                    <Text style={styles.label}>Select Category</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={values.category}
                            onValueChange={(itemValue) => handleCategoryChange(itemValue, setFieldValue)}
                            onFocus={() => animateInput(true)}
                            onBlur={() => {
                                handleBlur('category');
                                animateInput(false);
                            }}
                            style={[styles.picker, touched.category && errors.category ? styles.inputError : null]}
                        >
                            <Picker.Item label="Select a category" value="" />
                            {categories.map((category, key) => (
                                <Picker.Item
                                    key={key}
                                    label={category.name}
                                    value={category.id} />
                            ))}
                        </Picker>
                    </View>
                    {touched.category && errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

                    {/* Render animal fields dynamically based on selected category */}
                    {values.animals.length > 0 && (
                        <View>
                            <FlatList
                            data={values.animals}
                            renderItem={({ item }) => (
                                <View style={styles.animalContainer}>
                                    <Text style={styles.animalLabel}>Animal Type: {item.animalType}</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={item.breed}
                                        placeholder="Breed"
                                        onChangeText={(text) => setFieldValue(`animals[${item.id}].breed`, text)}
                                        onBlur={() => handleBlur(`animals[${item.id}].breed`)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={item.count.toString()}
                                        placeholder="Count"
                                        onChangeText={(text) => setFieldValue(`animals[${item.id}].count`, Number(text))}
                                        onBlur={() => handleBlur(`animals[${item.id}].count`)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={item.location}
                                        placeholder="Location"
                                        onChangeText={(text) => setFieldValue(`animals[${item.id}].location`, text)}
                                        onBlur={() => handleBlur(`animals[${item.id}].location`)}
                                    />
                                    <Text style={styles.animalLabel}>Health Status: {item.healthStatus}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.animalListContainer}
                        />
                        </View>
                        
                    )}

                    <TouchableOpacity style={styles.saveButton} onPress={() => handleSubmit()}>
                        <Text style={styles.saveButtonText}>Save Category</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};
// Helper function to render a color label with a square filled with the color


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
    animalContainer: {
        padding: SIZES.padding,
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
    },
    animalLabel: {
        color: COLORS.primary,
        ...FONTS.body3,
        marginBottom: SIZES.base / 2,
    },
    animalListContainer: {
        paddingVertical: SIZES.base,
    },
    input: {
        height: 45,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        backgroundColor: COLORS.lightGray2,
        marginBottom: SIZES.base,
    },
    inputError: {
        borderColor: COLORS.red,
    },
});


export default AddItemForm;
