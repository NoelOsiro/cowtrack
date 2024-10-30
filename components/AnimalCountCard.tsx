import React from 'react';
import { Card, Icon, Text } from '@rneui/themed';
import { StyleSheet, FlatList, View } from 'react-native';

type AnimalCountCardProps = {
  data: { category: string; count: number }[];
};

const AnimalCountCard: React.FC<AnimalCountCardProps> = ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Animal Count by Category</Text>
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Card containerStyle={styles.card}>
          <Icon name="pets" />
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.countText}>{item.count}</Text>
        </Card>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 8,
  },
  card: {
    width: 120,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  countText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default AnimalCountCard;
