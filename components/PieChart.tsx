import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Modal, TextInput, TouchableOpacity, Text } from "react-native";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";
import { ThemedText } from "./ThemedText";
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder'// Use a shimmer library
import { Animal } from "@/constants/types";
import { useAnimalStore } from "@/store/useAnimalstore";
import { LinearGradient } from 'expo-linear-gradient'
import { useAuthStore } from "@/store/authStore";


type DatumType = {
  x: string;
  y: number;
  label: string;
};

const PIE_CHART_SIZE = 630;
const SELECTED_RADIUS_OFFSET = 20;
const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient)

// Function to transform animal store data into chart data format
const generateChartData = (animals: Animal[]): DatumType[] => {

  return animals.map((animal) => ({
    x: animal.species,
    y: animal.count,
    label: animal.species,
  }));
};

export default function App() {
  const { animals, fetchAnimals } = useAnimalStore();
  const [chartData, setChartData] = useState<DatumType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlice, setSelectedSlice] = useState<DatumType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ x: "", y: "", label: "" });
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadAnimals = async () => {
      setLoading(true);
      if (user?.uid) {
        await fetchAnimals(user.uid); // Replace with actual user ID
      }
      setLoading(false);
    };
    loadAnimals();
  }, [fetchAnimals]);

  useEffect(() => {
    setChartData(generateChartData(animals));
  }, [animals]);

  const handleSliceClick = (datum: DatumType) => {
    setSelectedSlice(datum);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pieContainer}>
        {loading ? (
          <ShimmerPlaceHolder
            style={{
              height: PIE_CHART_SIZE,
              width: PIE_CHART_SIZE,
              borderRadius: PIE_CHART_SIZE / 2,
              backgroundColor: 'transparent',
              flex: 1,
            }}
          />
        ) : (
          <VictoryPie
            data={chartData}
            theme={VictoryTheme.material}
            height={PIE_CHART_SIZE}
            width={PIE_CHART_SIZE}
            innerRadius={({ datum }) => (selectedSlice?.x === datum.x ? 180 : 200)}
            radius={({ datum }) => (selectedSlice?.x === datum.x ? 300 : 280)}
            labels={({ datum }) => datum.label}
            labelComponent={<VictoryLabel angle={0} style={styles.labelStyle} />}
            labelRadius={({ innerRadius }) =>
              typeof innerRadius === "number" ? innerRadius + SELECTED_RADIUS_OFFSET : 230
            }
            animate={{ duration: 300 }}
            colorScale={["tomato", "orange", "gold"]}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: (evt, { datum }) => {
                    handleSliceClick(datum);
                    return [{ target: "data", mutation: () => null }];
                  },
                },
              },
            ]}
          />
        )}
        <ThemedText style={styles.centerText}>
          {selectedSlice ? `${selectedSlice.label}: ${selectedSlice.y}` : `Total Animals: ${animals.length}`}
        </ThemedText>
      </View>

      {/* Modal for adding new data */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Data to Chart</Text>
            <TextInput
              placeholder="Label"
              style={styles.input}
              value={newEntry.label}
              onChangeText={(text) => setNewEntry({ ...newEntry, label: text })}
            />
            <TextInput
              placeholder="X Value"
              style={styles.input}
              value={newEntry.x}
              onChangeText={(text) => setNewEntry({ ...newEntry, x: text })}
            />
            <TextInput
              placeholder="Y Value"
              style={styles.input}
              keyboardType="numeric"
              value={newEntry.y}
              onChangeText={(text) => setNewEntry({ ...newEntry, y: text })}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", marginVertical: 25 },
  pieContainer: { alignItems: "center", justifyContent: "center", position: "relative" },
  labelStyle: { fontSize: 16 },
  centerText: { position: "absolute", textAlign: "center", fontSize: 24, fontWeight: "bold" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContainer: { width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 5, borderRadius: 5 },
  addButton: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginTop: 10, alignItems: "center" },
  addButtonText: { color: "white", fontWeight: "bold" },
  cancelButton: { marginTop: 10, alignItems: "center" },
  cancelButtonText: { color: "red" },
});
