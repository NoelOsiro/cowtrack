import { StyleSheet, Pressable, ImageSourcePropType } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';


type CustomButtonProps = {
  flatListRef: React.RefObject<Animated.FlatList<any>>;
  flatListIndex: Animated.SharedValue<number>;
  dataLength: number;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  flatListRef,
  flatListIndex,
  dataLength,
}) => {
  const router = useRouter();

  const buttonAnimationStyle = useAnimatedStyle(() => ({
    width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
    height: 60,
  }));

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    width: 30,
    height: 30,
    opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
    transform: [
      {
        translateX: flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0),
      },
    ],
  }));

  const textAnimationStyle = useAnimatedStyle(() => ({
    opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
    transform: [
      {
        translateX: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
      },
    ],
  }));

  return (
    <Pressable
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          router.push('/');
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require('../../assets/images/ArrowIcon.png') as ImageSourcePropType}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
  },
});
