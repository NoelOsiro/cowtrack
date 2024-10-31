import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Modal, TextInput, TouchableOpacity, Text } from "react-native";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";
import { ThemedText } from "./ThemedText";
import { FONTFAMILY } from "@/constants/theme";

type DatumType = {
  x: string;
  y: number;
  label: string;
};

const initialData: DatumType[] = [
  { x: "One", y: 2, label: "Cows" },
  { x: "Two", y: 3, label: "Goats" },
  { x: "Three", y: 5, label: "Sheep" },
  { x: "Four", y: 4, label: "Poultry" },
  { x: "Five", y: 6, label: "Camels" },
  { x: "Six", y: 3, label: "Pigs" },
  { x: "Seven", y: 8, label: "Bulls" }
];

const PIE_CHART_SIZE = 600;
const SELECTED_RADIUS_OFFSET = 20;

const getTotalY = (data: DatumType[]) => {
  return data.reduce((total, item) => total + item.y, 0);
};

export default function App() {
  const [data, setData] = useState<DatumType[]>(initialData);
  const [selectedSlice, setSelectedSlice] = useState<DatumType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ x: "", y: "", label: "" });

  const handleSliceClick = (datum: DatumType) => {
    setSelectedSlice(datum);
  };

  const handleAddData = () => {
    if (newEntry.x && newEntry.y && newEntry.label) {
      setData([...data, { ...newEntry, y: parseInt(newEntry.y) }]);
      setModalVisible(false);
      setNewEntry({ x: "", y: "", label: "" });
    }
  };

  const renderLabelComponent = () => (
    <VictoryLabel angle={0} style={[styles.labelStyle, { fill: "#252525" }]} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.pieContainer}>
        <VictoryPie
          data={data}
          theme={VictoryTheme.material}
          height={PIE_CHART_SIZE}
          width={PIE_CHART_SIZE}
          innerRadius={({ datum }) => (selectedSlice?.x === datum.x ? 180 : 200)}
          radius={({ datum }) => (selectedSlice?.x === datum.x ? 300 : 280)}
          labels={({ datum }) => datum.label}
          labelComponent={renderLabelComponent()}
          labelRadius={({ innerRadius }) =>
            typeof innerRadius === "number" ? innerRadius + SELECTED_RADIUS_OFFSET : 230
          }
          animate={{ duration: 300 }}
          colorScale={["tomato", "orange", "gold"]}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: (evt, { datum }: { datum: DatumType }) => {
                  handleSliceClick(datum);
                  return [{ target: "data", mutation: () => null }];
                }
              }
            }
          ]}
        />
        <ThemedText style={styles.centerText}>
          {selectedSlice ? `${selectedSlice.label}: ${selectedSlice.y}` : 'Total: ' + getTotalY(data)}
        </ThemedText>
      </View>

      <Button title="Add Data" onPress={() => setModalVisible(true)} />

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
            <TouchableOpacity style={styles.addButton} onPress={handleAddData}>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  pieContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_bold
  },
  centerText: {
    position: "absolute",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center"
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center"
  },
  cancelButtonText: {
    color: "red"
  }
});
