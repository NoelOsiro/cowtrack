import { Icon, Input } from '@rneui/themed';
import React from 'react';

import { StyleSheet } from 'react-native';

const SearchInput = () => {
  return (
    <Input
      containerStyle={styles.container}
      disabledInputStyle={styles.disabledInput}
      inputContainerStyle={styles.inputContainer}
      errorStyle={styles.errorStyle}
      inputStyle={styles.input}
      labelStyle={styles.label}
      leftIcon={<Icon name="search" size={20} color="#888" />}
      leftIconContainerStyle={styles.leftIconContainer}
      rightIconContainerStyle={styles.rightIconContainer}
      placeholder="Enter Name"
      placeholderTextColor="#aaa"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    width: '100%',
  },
  disabledInput: {
    backgroundColor: '#ddd',
  },
  inputContainer: {
    borderBottomWidth: 0, // Hide default border
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 50,
    elevation: 2, // Add slight shadow on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  errorStyle: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },
});

export default SearchInput;
