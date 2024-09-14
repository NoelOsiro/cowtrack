import { Category } from "@/constants/categoriesData";
import { db } from "@/databaseSetup";
import { useSQLiteContext } from "expo-sqlite";

export function fetchCategoriesFromDb() {
 
    return db.runAsync('SELECT * FROM categories');;
  }

