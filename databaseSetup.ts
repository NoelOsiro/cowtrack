import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';
import { categoriesData } from '@/constants/categoriesData'; // Make sure to import the categories data
import { SQLiteDatabase } from 'expo-sqlite';

const dbName = 'farm.db';
export const db = SQLite.openDatabaseSync(dbName,{useNewConnection: true});
