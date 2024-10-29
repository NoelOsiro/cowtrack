// import React, { useCallback } from 'react';
// import { View, Text, Image, StyleSheet, Pressable, ImageURISource, ViewToken, SafeAreaView } from 'react-native';
// import Animated, {
//     useAnimatedRef,
//     useAnimatedScrollHandler,
//     useSharedValue,
//   } from 'react-native-reanimated';
// import { SPACING, COLORS, FONTFAMILY, FONTSIZE, BORDERRADIUS } from '@/constants/theme';
// import { Link } from 'expo-router';
// import ListItem from '@/components/Onboarding/ListItem';
// import PaginationElement from '@/components/Onboarding/Pagination';
// import Button from '@/components/Onboarding/Button';

// const pages = [
//   {
//     title: "Track Your Herd",
//     description: "Easily monitor your animal count.",
//     icon: require('../assets/images/track-herd-icon.png'),
//     text: "Track Your Herd",
//     image: require('../assets/images/track-herd-icon.png'),
//   },
//   {
//     title: "Batch Counting Made Easy",
//     description: "Efficiently count animals in groups.",
//     icon: require('../assets/images/batch-counting-icon.png'),
//     text: "Batch Counting Made Easy",
//     image: require('../assets/images/batch-counting-icon.png'),
//   },
//   {
//     title: "Health & Feeding Logs",
//     description: "Keep track of health and feeding schedules.",
//     icon: require('../assets/images/batch-counting-icon.png'),
//     text: "Health & Feeding Logs",
//     image: require('../assets/images/batch-counting-icon.png'),
//   },
//   {
//     title: "Detailed Reports",
//     description: "Analyze livestock data with ease.",
//     icon: require('../assets/images/reports-icon.png'),
//     text: "Detailed Reports",
//     image: require('../assets/images/reports-icon.png'),
//   },
// ];

// const OnboardingScreen = () => {
//     const x = useSharedValue(0);
//   const flatListIndex = useSharedValue(0);
//   const flatListRef = useAnimatedRef<
//     Animated.FlatList<{
//       text: string;
//       image: ImageURISource;
//     }>
//   >();
//   const onViewableItemsChanged = useCallback(
//     ({ viewableItems }: { viewableItems: ViewToken[] }) => {
//       flatListIndex.value = viewableItems[0].index ?? 0;
//     },
//     []
//   );
//   const scrollHandle = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       x.value = event.contentOffset.x;
//     },
//   });
//   const renderItem = useCallback(
//     ({
//       item,
//       index,
//     }: {
//       item: { text: string; image: ImageURISource, title: string, description: string };
//       index: number;
//     }) => {
//       return <ListItem item={item} index={index} x={x} />;
//     },
//     [x]
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         onScroll={scrollHandle}
//         horizontal
//         scrollEventThrottle={16}
//         pagingEnabled={true}
//         data={pages}
//         keyExtractor={(_, index) => index.toString()}
//         bounces={false}
//         renderItem={renderItem}
//         showsHorizontalScrollIndicator={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//       />
//       <View style={styles.bottomContainer}>
//         <PaginationElement length={pages.length} x={x} />
//         <Button
//           currentIndex={flatListIndex}
//           length={pages.length}
//           flatListRef={flatListRef}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
// });
// export default OnboardingScreen;

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import OnboardingScreen from '@/components/Onboarding/Onboarding'

type Props = {}

const onboarding = (props: Props) => {
  return (
    <View style={styles.container}>
      <OnboardingScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default onboarding
