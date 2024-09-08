import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SIZES, COLORS, FONTS, icons } from '@/constants';
import { Picker } from '@react-native-picker/picker';


const categorySchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    icon: Yup.string().required('Icon is required'),
    color: Yup.string().required('Color is required'),
});

const AddCategoryForm = () => {
    const [inputAnim] = React.useState(new Animated.Value(1));

    const handleSave = (values: { name: string; icon: string; color: string }) => {
        Toast.show('Category Added successfully', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: COLORS.primary,
        });
        console.log('Category Data:', values);
    };
    const renderPreviewItem = (values: { name: string; icon: string; color: string }) => {
        const iconSource = icons[values.icon] || icons.baby_car; // Default icon if not selected
        const color = values.color || COLORS.primary; // Default color
    
        return (
            <TouchableOpacity
            style={styles.itemContainer}
        >
            <Image
                source={iconSource}
                style={[styles.icon, { tintColor: color }]}
            />
            <Text style={styles.itemText}>{values.name || 'Category Name'}</Text>
        </TouchableOpacity>
        );
      };
    const animateInput = (focus: boolean) => {
        Animated.timing(inputAnim, {
            toValue: focus ? 1.05 : 1,
            duration: 200,
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
                    <Text style={styles.label}>Category Name</Text>
                    <TextInput
                        style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                        placeholder="Enter category name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        onFocus={() => Animated.spring(inputAnim, { toValue: 1.05, useNativeDriver: true }).start()}
                    />
                    {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <Text style={styles.label}>Icon</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={values.icon}
                            onValueChange={(itemValue) => setFieldValue('icon', itemValue)}
                            onFocus={() => animateInput(true)}
                            onBlur={() => {
                                handleBlur('icon');
                                animateInput(false)
                            }}
                            style={[styles.picker, touched.icon && errors.icon ? styles.inputError : null]}
                        >
                            <Picker.Item label="Select an icon" value="" />
                            {Object.keys(icons).map((key) => (
                                <Picker.Item 
                                key={key} 
                                label={key.replace(/_/g, ' ')} 
                                value={key} />
                            ))}
                        </Picker>
                    </View>
                    {touched.icon && errors.icon && <Text style={styles.errorText}>{errors.icon}</Text>}

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
                        {touched.color && errors.color && <Text style={styles.errorText}>{errors.color}</Text>}
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={() => handleSubmit()}>
                        <Text style={styles.saveButtonText}>Save Category</Text>
                    </TouchableOpacity>
                    {/* Preview Section */}
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Preview</Text>
            {renderPreviewItem(values)}
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
