import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { HeaderWithProfileIcon } from '@/components/HeaderBar';
import { ThemedText } from '@/components/ThemedText';
import SearchInput from '@/components/SearchInput';
import AnimalCountCard from '@/components/AnimalCountCard';
import RecentChangesCard from '@/components/RecentChangesCard';
import ActionButtons from '@/components/ActionButtons';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { animalCategories, recentChanges } from '@/constants/mockdata';
import PieChart from '@/components/PieChart';

const HomeScreen: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  return (
    <ThemedScrollView contentContainerStyle={styles.container}>
      <HeaderWithProfileIcon />
      <ThemedText style={styles.headerText}>Farm Overview</ThemedText>
      <SearchInput />
      {user && (
        <>
          <PieChart />
          {/* <AnimalCountCard data={animalCategories} /> */}
          {/* <RecentChangesCard data={recentChanges} />
          <ActionButtons /> */}
        </>
      )}
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
