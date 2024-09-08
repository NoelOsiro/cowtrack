import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput as RNTextInput } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { SIZES, COLORS, FONTS, icons } from '@/constants';
import { Category } from '@/constants/categoriesData';
import useCategoryStore from '@/store/useCategoryStore';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  color: Yup.string().required('Color is required'),
  icon: Yup.string().required('Icon is required'),
});

interface EditCategoryProps {
  onSave: (values: { name: string; color: string; icon: string }) => void;
}

const EditCategory = ({ onSave }: EditCategoryProps) => {
  const { selectedCategory } = useCategoryStore();

  useEffect(() => {
  }, [selectedCategory]);

  if (!selectedCategory) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={[FONTS.h3, { color: COLORS.primary }]}>No Record</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Formik
      enableReinitialize
        initialValues={{
          name: selectedCategory.name,
          color: selectedCategory.color,
          icon: Object.keys(icons).find(iconKey => icons[iconKey] === selectedCategory.icon) || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave({
            ...values,
            icon: icons[values.icon as keyof typeof icons],
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/* Title Preview */}
              <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={icons[values.icon as keyof typeof icons]}
                    style={[styles.icon, { tintColor: values.color }]}
                  />
                </View>
                <Text style={[FONTS.h3, { color: values.color }]}>{values.name}</Text>
              </View>

              {/* Form Fields */}
              <View style={styles.descriptionContainer}>
                <Text style={FONTS.h2}>Edit Category</Text>

                <Field
                  name="name"
                  component={TextInput}
                  style={styles.input}
                  placeholder="Category Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name && errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                <Text style={styles.label}>Select Color:</Text>
                <ScrollView style={styles.pickerContainer}>
                  <Field
                    name="color"
                    component={Picker}
                    selectedValue={values.color}
                    onValueChange={handleChange('color')}
                    style={styles.picker}
                  >
                    {Object.keys(COLORS).map((colorKey) => (
                      <RNPicker.Item
                        key={colorKey}
                        label={colorKey}
                        value={COLORS[colorKey as keyof typeof COLORS]}
                        color={COLORS[colorKey as keyof typeof COLORS]}
                      />
                    ))}
                  </Field>
                </ScrollView>
                {touched.color && errors.color ? <Text style={styles.errorText}>{errors.color.toString()}</Text> : null}

                <Text style={styles.label}>Select Icon:</Text>
                <ScrollView style={styles.pickerContainer}>
                  <Field
                    name="icon"
                    component={Picker}
                    selectedValue={values.icon}
                    onValueChange={handleChange('icon')}
                    style={styles.picker}
                  >
                    {Object.keys(icons).map((iconKey) => (
                      <RNPicker.Item key={iconKey} label={iconKey} value={iconKey} />
                    ))}
                  </Field>
                </ScrollView>
                {touched.icon && errors.icon ? <Text style={styles.errorText}>{errors.icon}</Text> : null}
              </View>
            </ScrollView>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: values.color }]}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={styles.saveButtonText}>Save {values.name}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base,
  },
  icon: {
    width: 30,
    height: 30,
  },
  descriptionContainer: {
    paddingHorizontal: SIZES.padding,
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
    maxHeight: 200, // Adjust based on expected content
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

const Picker = (props: any) => {
  return (
    <RNPicker
      selectedValue={props.field.value}
      onValueChange={props.field.onChange(props.field.name)}
      {...props}
    >
      {props.children}
    </RNPicker>
  );
};

const TextInput = (props: any) => {
  return <RNTextInput {...props} />;
};

export default EditCategory;
