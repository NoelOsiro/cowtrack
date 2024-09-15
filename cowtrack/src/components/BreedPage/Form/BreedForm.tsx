import React from 'react';
import { IonInput, IonItem, IonText, IonSelect, IonSelectOption, IonButton, IonCardContent, IonCardTitle, IonIcon } from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryIcons, categoryColors } from '../../../constants';


interface BreedFormProps {
  onSubmit: (values: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: { name: string; categoryId:string };
  deleteCategory?: (values: any) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Breed name is required'),
  categoryId: Yup.string().required('Category is required'),
});

const BreedForm: React.FC<BreedFormProps> = ({ onSubmit, onChange, values, deleteCategory }) => {
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
        label='Breed Name'
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
        value={formik.values.categoryId}
        onIonChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className='input-field'
        label='Category'
        labelPlacement='floating'
        fill='outline'
      >
        {categoryIcons.map((icon) => (
          <IonSelectOption key={icon.value} value={icon.value}>
            {icon.label}
          </IonSelectOption>
        ))}
      </IonSelect>
      {formik.touched.categoryId && formik.errors.categoryId && (
        <IonItem><IonText color={'danger'} className='error-text'>{formik.errors.categoryId}</IonText></IonItem>
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

export default BreedForm;
