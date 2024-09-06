import { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated, useWindowDimensions } from 'react-native';
import slides from '../constants/Slides';
import OnboardingItem from './OnboardingItem';

export default function Onboarding() {
    const { width } = useWindowDimensions(); // Get screen width
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);  // Safely update currentIndex
        }
    }).current;

    // Listen to the scroll position and update the index
    const handleScroll = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false,listener: handleScroll }
                    )}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slideRef}
                    snapToInterval={width} // Snap each item to the screen width
                    decelerationRate="fast" // Make scrolling faster
                />
            </View>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    pagination: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 8,
    },
    activeDot: {
        backgroundColor: '#ca441c',
    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
});
