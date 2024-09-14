import AddCategoryForm from '@/components/Forms/AddCategoryForm';
import { CategoryHeader } from '@/components/Headers/CategoryHeader';
import EditCategoryList from '@/components/Lists/EditCategoryList';
import { NavBar } from '@/components/NavBar';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

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
      

      {/* Header section */}
      <CategoryHeader onAddCategory={handleAddCategory} onEditCategory={handleEditCategory} title={'Categories'} subtitle={'Add or Edit categories'} />
      {/* Scrollable content section for Add/Edit Category */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
      
        {action === null && <EditCategoryList />}  
        {action === 'add' && <AddCategoryForm />}  
        {action === 'edit' && <EditCategoryList />}  
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
