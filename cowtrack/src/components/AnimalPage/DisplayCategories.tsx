import React, { useEffect, useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/react';
import { Category, categoryIcons } from '../../constants';
// Import your icons



const DisplayCategories = ({ onEdit }: { onEdit: (category: Category) => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await Filesystem.readFile({
          path: 'categories.json',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });

        if (typeof result.data === 'string') {
          const data: Category[] = JSON.parse(result.data);
          setCategories(data);
        } else {
          console.error('Unexpected data type:', typeof result.data);
        }
      } catch (error) {
        console.error('Unable to read file', error);
      }
    };

    loadData();
  }, []);

  return (

    <IonGrid>
    <IonRow>
      {categories.length === 0 ? (
        <IonCol size="12">
          <IonText>No categories found</IonText>
        </IonCol>
      ) : (
        categories.map((category) => (
          <IonCol size="6" key={category.id}>
            <IonButton
              expand="full"
              onClick={() => onEdit(category)}
              style={{ backgroundColor: category.color, color: 'white' }}
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

const EditCategoryForm: React.FC<{ category: Category; onClose: () => void }> = ({ category, onClose }) => {
  // Implement your form here similar to the one in `CategoryForm`

  return (
    <IonCard>
      <IonCardContent>
        <h2>Edit Category</h2>
        {/* Form components here */}
        <IonButton onClick={onClose}>Close</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default DisplayCategories;
