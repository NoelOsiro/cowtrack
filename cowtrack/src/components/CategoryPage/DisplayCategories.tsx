import { IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/react';
import { Category, categoryIcons } from '../../constants';
import { useCategoryStore } from '../../store/categoryStore';
// Import your icons



const DisplayCategories = ({ onEdit }: { onEdit: (category: Category) => void }) => {
  const {categories} = useCategoryStore()
  return (

    <IonGrid>
    <IonRow>
      {categories.length === 0 ? 
      (
        <IonCol size="12">
          <IonText>No categories found</IonText>
        </IonCol>
      ) : 
      (
        categories.map((category,index) => (
          
          <IonCol size="6" key={index}>
            <IonButton
              expand="full"
              onClick={() => onEdit(category)}
              style={{ backgroundColor: category.color, color: 'white', width: 'fit-content' }}
            >
              {categoryIcons.find(icon => icon.value === category.icon) && (
                <IonIcon
                  icon={categoryIcons.find(icon => icon.value === category.icon)?.icon}
                  style={{ marginRight: '10px', color: `${category.color}` }}
                />
              )}
              <IonText>{category.name}</IonText>
            </IonButton>
          </IonCol>
        ))
      )}
    </IonRow>
  </IonGrid>
  );
};

export default DisplayCategories;
