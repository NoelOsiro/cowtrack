import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Pressable, TextInput as RNTextInput, Animated } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { SIZES, COLORS, FONTS, icons } from '@/constants';
import useCategoryStore from '@/store/useCategoryStore';
import { Animal } from '@/constants/categoriesData';
import CategoryNameInput from './CategoryNameInput';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';
import renderCategoryPreview from '../Preview/CategoryPreview';

import { animalIcons } from '@/constants/icons';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  color: Yup.string().required('Color is required'),
  icon: Yup.string().required('Icon is required'),
});

interface EditCategoryProps {
  onSave: ( name: string, color: string, icon: string,animals:Animal[] ) => Promise<void>; // Handle async saving
}

const EditCategory = ({ onSave }: EditCategoryProps) => {
  const [inputAnim] = React.useState(new Animated.Value(1));

  const [isDeleting, setIsDeleting] = React.useState(false);
  const { selectedCategory,setSelectedCategory } = useCategoryStore();
  const { deleteCategory } = useCategoryStore();

  useEffect(() => {}, [selectedCategory]);

  if (!selectedCategory) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={[FONTS.h3, { color: COLORS.primary }]}>No Record</Text>
      </View>
    );
  }
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCategory(selectedCategory.id);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleting(false);
      setSelectedCategory(null);
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
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          name: selectedCategory.name,
          color: selectedCategory.color,
          icon: selectedCategory.icon.name,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSave(
              values.name,
              values.icon,
              values.color,
              selectedCategory.animals
// Map icon key to actual icon
            );
            console.log(values)
          } catch (error) {
            console.error('Error saving category:', error);
          } finally {
            setSubmitting(false); // Ensure the form is re-enabled after save
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue,isSubmitting,isValid }) => (
          <>
            <View style={styles.scrollContainer}>
              {/* Title Preview */}
              <View style={styles.titleContainer}>
              {renderPreviewItem({ name: values.name, icon: values.icon as keyof typeof animalIcons, color: values.color })}
              </View>

              {/* Form Fields */}
              <View style={styles.descriptionContainer}>
                <Text style={FONTS.h2}>Edit Category</Text>

                {/* Category Name */}
                <CategoryNameInput
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                        inputAnim={inputAnim}
                    />
                {/* Color */}
                <ColorPicker
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        animateInput={animateInput}
                    />
                {/* Icon */}
                <IconPicker
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        animateInput={animateInput}
                    />

                    {/* Save Button */}
            <Pressable
              style={[styles.saveButton, { backgroundColor: values.color }]}
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}
            >
              <Text style={styles.saveButtonText}>
                {isSubmitting ? 'Saving...' : `Save ${values.name}`}
              </Text>
            </Pressable>
            {/* Delete Button */}
            <Pressable
              style={[styles.saveButton, { backgroundColor: COLORS.red }]}
              onPress={() => handleDelete()}
              disabled={!isValid || isDeleting}
            >
              <Text style={styles.saveButtonText}>
                {isDeleting ? 'Deleting...' : `Delete ${values.name}`}
              </Text>
            </Pressable>
              </View>
            </View>

            
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: SIZES.padding,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  saveButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  errorText: {
    color: COLORS.red,
    marginBottom: 10,
  },
  noRecordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
});

export default EditCategory;
