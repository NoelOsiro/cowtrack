import { StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { slides } from '@/constants/slides';
import { COLORS } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import OnboardingItem from './OnboardingItem';
import Pagination from './Pagination';

type Props = {};

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = (props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList<any>>(null);

  const updateCurrentSlideIndex = (e: any) => {
    console.log(e);
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
    
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style="light" />
      <FlatList
        ref={ref}
        data={slides}
        onMomentumScrollEnd={updateCurrentSlideIndex} // Update index when swiping
        contentContainerStyle={{ height: height * 0.75,width:width }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <OnboardingItem item={item} />}
      />
      <Pagination 
        currentSlideIndex={currentSlideIndex} 
        goToNextSlide={goToNextSlide} 
        skip={skip} 
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
  },
});
