import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

// Reference to the animals collection
export const animalsCollection = collection(db, 'animals');

// Function to get animals by userId
export async function getAnimalsByUserId(userId: string) {
    const q = query(animalsCollection, where("userId", "==", userId));
    const animalSnapshot = await getDocs(q);
    const animalList = animalSnapshot.docs.map(doc => ({
        id: doc.id,         // Include document ID
        ...doc.data()       // Spread other document fields
    }));
    return animalList;
}
