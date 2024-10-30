import React from 'react';
import { Card, Icon, Text } from '@rneui/themed';
import { StyleSheet, FlatList } from 'react-native';

type RecentChangesCardProps = {
  data: { id: number; description: string; date: string }[];
};

const RecentChangesCard: React.FC<RecentChangesCardProps> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <Card containerStyle={styles.card}>
        <Icon name="event" style={styles.icon} />
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </Card>
    )}
    contentContainerStyle={styles.listContent}
  />
);

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  icon: {
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default RecentChangesCard;
