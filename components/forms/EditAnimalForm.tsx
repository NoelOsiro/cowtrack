import { useAnimalStore } from "@/store/useAnimalstore";
import React, { useEffect, useState } from "react";
import { Button, TextInput, View } from "react-native";

interface EditAnimalFormProps {
  animalId: string;
}

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({ animalId }) => {
  const { animals, updateAnimal } = useAnimalStore();
  const animal = animals.find((a) => a.id === animalId);
  const [editableData, setEditableData] = useState(animal);

  useEffect(() => {
    if (animal) setEditableData(animal);
  }, [animal]);

  const handleUpdateAnimal = async () => {
    if (editableData) {
      await updateAnimal(editableData);
    }
  };

  return (
    <View>
      {editableData && (
        <TextInput  placeholder="Weight" value={String(editableData.initialWeight)} onChangeText={(text) => setEditableData((prev) => prev ? ({ ...prev, initialWeight: Number(text) }) : prev)} />
      )}
      <TextInput placeholder="Health Status" value={editableData?.initialHealthStatus} onChangeText={(text) => setEditableData((prev) => prev ? ({ ...prev, initialHealthStatus: text }) : prev)} />
      {/* Additional fields here */}
      <Button title="Save Changes" onPress={handleUpdateAnimal} />
    </View>
  );
};

export default EditAnimalForm;
