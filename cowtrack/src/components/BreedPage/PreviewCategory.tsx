import React from 'react';
import { IonButton, IonIcon, IonText } from '@ionic/react';
import { categoryIcons } from '../../constants';


interface PreviewCategoryProps {
  name: string;
  icon: string;
  color: string;
}

const PreviewCategory: React.FC<PreviewCategoryProps> = ({ name, icon, color }) => {
  const selectedIcon = categoryIcons.find(i => i.value === icon);

  return (
    <IonButton expand="block" className='preview-button'>
      {selectedIcon && <IonIcon icon={selectedIcon.icon} style={{ color: color || 'gray' }} />}
      <IonText style={{ marginLeft: selectedIcon ? '10px' : '0' }}>
        {name || 'Category Name'}
      </IonText>
    </IonButton>
  );
};

export default PreviewCategory;
