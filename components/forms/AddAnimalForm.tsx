import { Animal } from "@/constants/types";
import { useAnimalStore } from "@/store/useAnimalstore";
import React, { useState } from "react";

import { Button, TextInput, View } from "react-native";

const initialValues = {
    rfid_tag: "",
    id: "",
    breed: "",
    name: "",
    dob: "",
    initialWeight: 0,
    initialHealthStatus: "",
    gender: "",
    origin: "",
    purchaseDate: "",
    purpose: "",
    owner: "",
    species: "",
    age: 0,
    count: 0,
    userId: "",
  }


const AddAnimalForm = () => {
  const { addAnimal } = useAnimalStore();
  const [animalData, setAnimalData] = useState<Animal>(initialValues);

  const handleAddAnimal = async () => {
    await addAnimal(animalData);
    setAnimalData(initialValues); // Reset form
  };

  return (
    <View>
        <TextInput
            placeholder="RFID Tag"
            value={animalData.rfid_tag}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, rfid_tag: text }))} />
        <TextInput
            placeholder="Name"
            value={animalData.name}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, name: text }))} />
        <TextInput
            placeholder="Breed"
            value={animalData.breed}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, breed: text }))} />
        <TextInput
            placeholder="DOB"
            value={animalData.dob}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, dob: text }))} />
        <TextInput
            placeholder="Initial Weight"
            value={animalData.initialWeight.toString()}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, initialWeight: Number(text) }))} />
        <TextInput
            placeholder="Initial Health Status"
            value={animalData.initialHealthStatus}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, initialHealthStatus: text }))} />
        <TextInput
            placeholder="gender"
            value={animalData.gender}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, gender: text }))} />
        <TextInput
            placeholder="Origin"
            value={animalData.origin}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, origin: text }))} />
        <TextInput
            placeholder="Purchase Date"
            value={animalData.purchaseDate}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, purchaseDate: text }))} />
        <TextInput
            placeholder="Purpose"
            value={animalData.purpose}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, purpose: text }))} />
        <TextInput
            placeholder="Owner"
            value={animalData.owner}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, owner: text }))} />
        <TextInput
            placeholder="Species"
            value={animalData.species}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, species: text }))} />
        <TextInput
            placeholder="Age"
            value={animalData.age.toString()}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, age: Number(text) }))} />
        <TextInput
            placeholder="Count"
            value={animalData.count.toString()}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, count: Number(text) }))} />
        <TextInput
            placeholder="User ID"
            value={animalData.userId}
            onChangeText={(text) => setAnimalData((prev) => ({ ...prev, userId: text }))} />

      {/* Additional fields here */}
      <Button title="Add Animal" onPress={handleAddAnimal} />
    </View>
  );
};

export default AddAnimalForm;
