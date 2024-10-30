import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";

type DatumType = {
  x: string;
  y: number;
  label: string;
};

const data: DatumType[] = [
  { x: "One", y: 2, label: "2" },
  { x: "Two", y: 3, label: "3" },
  { x: "Three", y: 5, label: "5" }
];

export default function App() {
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  const handleSliceClick = (datum: DatumType) => {
    setSelectedSlice(datum.y);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pieContainer}>
        <VictoryPie 
          data={data}
          theme={VictoryTheme.material}
          height={400}
          innerRadius={70}
          labelRadius={({ innerRadius }) => (typeof innerRadius === 'number' ? innerRadius + 20 : 90)}
          animate={{ duration: 500 }}
          colorScale={["tomato", "orange", "gold"]}
          cornerRadius={({ datum }) => (selectedSlice === datum.y ? 10 : 5)}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: (evt, { datum }: { datum: DatumType }) => {
                  handleSliceClick(datum);
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => ({
                        style: { ...style, fill: "#c43a31" }
                      })
                    }
                  ];
                }
              }
            }
          ]}
        />
        <Text style={styles.centerText}>
          {selectedSlice !== null ? `Value: ${selectedSlice}` : "Select a slice"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  pieContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  centerText: {
    position: "absolute",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  }
});
