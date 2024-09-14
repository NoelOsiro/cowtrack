import { db } from "@/databaseSetup";
import { useSQLiteContext } from "expo-sqlite";

interface FormData {
  color: string;
  icon: string; 
  name: string;
}

export const saveCategory = async (formData: FormData) => {


  try {
    // Save form data in the database
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        'INSERT INTO categories (name, color, icon) VALUES (?, ?, ?)',
        [formData.name, formData.color, formData.icon] // Store the icon name as a string
      );
    });
    console.log('Category saved successfully!');
  } catch (error) {
    console.error('Error saving category:', error);
  }
};
