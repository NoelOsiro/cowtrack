import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonText, IonIcon } from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { home, pencil, addCircle } from 'ionicons/icons'; // Importing icons

const categoryIcons = [
  { value: 'home', label: 'Home', icon: home },
  { value: 'pencil', label: 'Pencil', icon: pencil },
  { value: 'addCircle', label: 'Add Circle', icon: addCircle },
];

const categoryColors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
];

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  icon: Yup.string().required('Icon is required'),
  color: Yup.string().required('Color is required'),
});

const AddCategory = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      icon: '',
      color: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form Submitted', values);
      // Handle form submission
    },
  });

  // Find selected icon
  const selectedIcon = categoryIcons.find(icon => icon.value === formik.values.icon);

  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Add Category</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='form-content'>
        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Category Name */}
          <IonInput
            labelPlacement="floating"
            label='Category Name'
            name="name"
            className='input-field'
            value={formik.values.name}
            onIonChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fill='outline'
          />

          {formik.touched.name && formik.errors.name && (
            <IonItem><IonText color={'danger'} className='error-text'>{formik.errors.name}</IonText></IonItem>
          )}

          {/* Icon Selection */}
          <IonSelect
            name="icon"
            value={formik.values.icon}
            onIonChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='input-field'
            label='Icon'
            labelPlacement='floating'
            fill='outline'
          >
            {categoryIcons.map((icon) => (
              <IonSelectOption key={icon.value} value={icon.value}>
                {icon.label}
              </IonSelectOption>
            ))}
          </IonSelect>

          {formik.touched.icon && formik.errors.icon && (
            <IonItem><IonText color={'danger'} className='error-text'>{formik.errors.icon}</IonText></IonItem>
          )}

          {/* Color Selection */}
          <IonSelect
            name="color"
            value={formik.values.color}
            onIonChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='input-field'
            label='Color'
            labelPlacement='floating'
            fill='outline'
          >
            {categoryColors.map((color) => (
              <IonSelectOption key={color.value} value={color.value}>
                {color.label}
              </IonSelectOption>
            ))}
          </IonSelect>

          {formik.touched.color && formik.errors.color && (
            <IonItem><IonText color={'danger'} className='error-text'>{formik.errors.color}</IonText></IonItem>
          )}

          {/* Submit Button */}
          <IonButton expand="full" type="submit">
            Submit
          </IonButton>
        </form>
      </IonCardContent>

      {/* Preview Section */}
      <IonCardContent className='preview-content'>
        <IonCardTitle className='preview-title'>Preview</IonCardTitle>
        <IonButton
        className='preview-button'
          expand="block"
          
        >
          {selectedIcon && <IonIcon icon={selectedIcon.icon} style={{ color: formik.values.color || 'gray' }}/>}
          <IonText style={{ marginLeft: selectedIcon ? '10px' : '0' }}>
            {formik.values.name || 'Category Name'}
          </IonText>
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default AddCategory;
