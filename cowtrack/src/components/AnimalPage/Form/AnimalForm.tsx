import React from 'react';
import { IonInput, IonItem, IonText, IonSelect, IonSelectOption, IonButton, IonCardContent, IonCardTitle, IonIcon } from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryIcons, categoryColors } from '../../../constants';
import { useStore } from '../../../store/categoryStore';
import { useBreedStore } from '../../../store/breedStore';


interface AnimalFormProps {
  onSubmit: (values: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: { name: string; breedId: string; categoryId: string; count: number; };
  deleteAnimal?: (values: any) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  breedId: Yup.string().required('Breed is required'),
  categoryId: Yup.string().required('Category is required'),
  count: Yup.number().required('Count is required'),
});

const BreedForm: React.FC<AnimalFormProps> = ({ onSubmit, onChange, values, deleteAnimal }) => {
  const { categories } = useStore();
  const { breeds } = useBreedStore();

  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit,
  });

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
        name="breedId"
        value={formik.values.breedId}
        onIonChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className='input-field'
        label='Breed'
        labelPlacement='floating'
        fill='outline'
      >
        {breeds.map((breed) => (
          <IonSelectOption key={breed.id} value={breed.id}>
            {breed.name}
          </IonSelectOption>
        ))}
      </IonSelect>
      {formik.touched.breedId && formik.errors.breedId && (
        <IonItem><IonText color={'danger'} className='error-text'>{formik.errors.breedId}</IonText></IonItem>
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

      {deleteAnimal && (
        <IonButton expand="full" onClick={deleteAnimal} color="warning">
          Delete Category
        </IonButton>
      )}
      
    </form>
  );
};

export default BreedForm;
