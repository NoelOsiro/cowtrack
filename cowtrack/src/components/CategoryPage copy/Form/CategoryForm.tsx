import React from 'react';
import { IonInput, IonItem, IonText, IonSelect, IonSelectOption, IonButton, IonCardContent, IonCardTitle, IonIcon } from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryIcons, categoryColors } from '../../../constants';


interface CategoryFormProps {
  onSubmit: (values: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: { name: string; icon: string; color: string };
  deleteCategory?: (values: any) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  icon: Yup.string().required('Icon is required'),
  color: Yup.string().required('Color is required'),
});

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onChange, values, deleteCategory }) => {
  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit,
  });
  const selectedIcon = categoryIcons.find(icon => icon.value === formik.values.icon);

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <IonButton expand="full" type="submit">
        Submit
      </IonButton>

      {deleteCategory && (
        <IonButton expand="full" onClick={deleteCategory} color="warning">
          Delete Category
        </IonButton>
      )}
      

      <IonCardContent className='preview-content'>
        <IonCardTitle className='preview-title'>Preview</IonCardTitle>
        <IonButton
          className='preview-button'
          expand="block"
        >
          {selectedIcon && <IonIcon icon={selectedIcon.icon} style={{ color: formik.values.color || 'gray' }} />}
          <IonText style={{ marginLeft: selectedIcon ? '10px' : '0' }}>
            {formik.values.name || 'Category Name'}
          </IonText>
        </IonButton>
      </IonCardContent>
    </form>
  );
};

export default CategoryForm;
