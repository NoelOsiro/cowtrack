import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type FeatherIconName = 'search' | 'filter' | 'more-vertical';

// Icons for the header
const icons: { name: FeatherIconName; onPress?: () => void }[] = [
  { name: 'search' },
  { name: 'filter', onPress: () => alert('Filter clicked') },
  { name: 'more-vertical', onPress: () => alert('Options clicked') },
];

// Sample data for suggestions
const SUGGESTIONS = ['Settings', 'Profile', 'Notifications', 'Help', 'Logout'];

export default function RenderHeaderIcons() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState(SUGGESTIONS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setFilteredSuggestions(
      SUGGESTIONS.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View>
      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={icon.name === 'search' ? () => setSearchOpen(!searchOpen) : icon.onPress}
          >
            <Feather name={icon.name} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>

      {searchOpen && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search..."
          />
          {searchQuery.length > 0 && (
            <FlatList
              data={filteredSuggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Text style={styles.suggestion}>{item}</Text>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    position: 'absolute',
    top: 40,
    width: 320,
    right: '10%',
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  suggestion: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
