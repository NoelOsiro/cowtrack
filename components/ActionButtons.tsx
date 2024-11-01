import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

const ActionButtons: React.FC = () => (
  <View style={styles.buttonContainer}>
    <Button
      title="Add New Animal"
      icon={{ name: 'add', color: 'white' }}
      buttonStyle={styles.button}
      onPress={() => {/* Add navigation or function to add animal */}}
    />
    <Button
      title="Update Records"
      icon={{ name: 'edit', color: 'white' }}
      buttonStyle={styles.button}
      onPress={() => {/* Add navigation or function to update records */}}
    />
    <Button
      title="View Reports"
      icon={{ name: 'bar-chart', color: 'white' }}
      buttonStyle={styles.button}
      onPress={() => {/* Add navigation or function to view reports */}}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexBasis: '48%', // Each button will take nearly half of the container width
    marginVertical: 8,
    paddingHorizontal: 12,
  },
});

export default ActionButtons;
