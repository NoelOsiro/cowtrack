import { Dimensions, StyleSheet, Pressable, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SPACING } from '@/constants/theme';
import { slides } from '@/constants/slides';
import { Link } from 'expo-router';

const { height } = Dimensions.get('window');

type Props = {
  currentSlideIndex: number;
  goToNextSlide: () => void;
  skip: () => void;
};

const Pagination: React.FC<Props> = (props: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {/* Indicator container */}
      <View style={styles.indicatorContainer}>
        {/* Render indicators */}
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              props.currentSlideIndex === index && {
                backgroundColor: COLORS.primaryWhiteHex,
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      <View style={{ marginBottom: SPACING.space_20 }}>
        {props.currentSlideIndex === slides.length - 1 ? (
          <View style={{ height: 50 }}>
            <Link href="/login" asChild>
              <Pressable style={styles.btn}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  GET STARTED
                </Text>
              </Pressable>
            </Link>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btn, { borderColor: COLORS.primaryWhiteHex, borderWidth: 1, backgroundColor: 'transparent' }]}
              onPress={props.skip}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.primaryWhiteHex }}>
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.goToNextSlide}
              style={styles.btn}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    height: height * 0.20,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.space_20,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
