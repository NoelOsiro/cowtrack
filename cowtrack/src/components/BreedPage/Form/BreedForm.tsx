import React from 'react';
import { IonInput, IonItem, IonText, IonSelect, IonSelectOption, IonButton, IonCardContent, IonCardTitle, IonIcon } from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../../store/categoryStore';


interface BreedFormProps {
  onSubmit: (values: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: { name: string; categoryId:string };
  deleteBreed?: (values: any) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Breed name is required'),
  categoryId: Yup.string().required('Category is required'),
});

const BreedForm: React.FC<BreedFormProps> = ({ onSubmit, onChange, values, deleteBreed }) => {
  const { categories } = useStore();
  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit,
  });

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
        name="categoryId"
        value={formik.values.categoryId}
        onIonChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className='input-field'
        label='Category'
        labelPlacement='floating'
        fill='outline'
      >
        {categories.map((category) => (
          <IonSelectOption key={category.id} value={category.id}>
            {category.name}
          </IonSelectOption>
        ))}
      </IonSelect>
      {formik.touched.categoryId && formik.errors.categoryId && (
        <IonItem><IonText color={'danger'} className='error-text'>{formik.errors.categoryId}</IonText></IonItem>
      )}

      

      <IonButton expand="full" type="submit">
        Submit
      </IonButton>

      {deleteBreed && (
        <IonButton expand="full" onClick={deleteBreed} color="warning">
          Delete Breed
        </IonButton>
      )}
    </form>
  );
};

export default BreedForm;
