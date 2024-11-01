import React from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import PieChart from './PieChart';
import { TextInput, TouchableOpacity, View } from 'react-native';

const Tabs = () => {
const [index, setIndex] = React.useState(0);

return (
  <>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Add New Animal"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Update Records"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="View Reports"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'red', width: '100%', flex:1 }}>
        <PieChart />
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
        {/* Modal for adding new data */}
      {/* <View transparent={true} visible={modalVisible} animationType="slide">
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
      </View> */}
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
        <Text h1>Recent Changes</Text>
      </TabView.Item>
    </TabView>
  </>
);
};
export default Tabs;