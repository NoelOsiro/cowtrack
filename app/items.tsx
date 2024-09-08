import { CategoryHeader } from '@/components/Headers/CategoryHeader';
import EditCategoryList from '@/components/Lists/EditCategoryList';
import { NavBar } from '@/components/NavBar';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import icons from '@/constants/icons'; // Import icons from icons.ts
import AddItemForm from '@/components/Forms/AddItemForm';



type Props = {};

const Category = (props: Props) => {
  const [action, setAction] = useState<'add' | 'edit' | null>(null); // State to manage whether we're adding or editing a category

  const handleAddCategory = () => {
    setAction('add');
  };

  const handleEditCategory = () => {
    setAction('edit');
  };

  return (
    <View style={styles.container}>
      {/* Nav bar section */}
      <NavBar />

      {/* Header section */}
      <CategoryHeader onAddCategory={handleAddCategory} onEditCategory={handleEditCategory} title={'Items'} subtitle={'Add/Edit items'} />

      {/* Scrollable content section for Add/Edit Category */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {action === 'add' && <AddItemForm />}  {/* Show Add Category Form */}
        {action === 'edit' && <EditCategoryList />}  {/* Show Edit Category List */}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default Category;
