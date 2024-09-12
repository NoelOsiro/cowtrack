import { NavBar } from '@/components/NavBar';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, Animated, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const images = [
    { id: '1', uri: '../assets/images/bulls.jpeg' },
    { id: '2', uri: '../assets/images/farm.jpeg' },
    { id: '3', uri: '../assets/images/goat.jpeg' },
    { id: '4', uri: 'https://your-image-url.com/image4.jpg' },
  ];
const ProfileScreen = () => {
  const profileImageScale = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const formSlideUp = useRef(new Animated.Value(300)).current; // for sliding the form from the bottom
  const formOpacity = useRef(new Animated.Value(0)).current;
  const [isEditing, setIsEditing] = useState(false); // track form visibility

  useEffect(() => {
    // Profile image scale animation
    Animated.spring(profileImageScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 1,
      bounciness: 10,
    }).start();

    // Profile details fade-in animation
    Animated.timing(detailsOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Show form with animation
      Animated.parallel([
        Animated.timing(formSlideUp, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide form with animation
      Animated.parallel([
        Animated.timing(formSlideUp, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(formOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  const renderImage = ({ item }: { item: { id: string; uri: string } }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editText}>{isEditing ? 'Close' : 'Edit Profile'}</Text>
        </Pressable>
      </View>

      {/* Animated Profile Section */}
      <View style={styles.profileSection}>
        <Animated.Image
          source={{ uri: '../assets/images/profile_pic.jpeg' }}
          style={[styles.profileImage, { transform: [{ scale: profileImageScale }] }]}
        />
        <Animated.Text style={[styles.profileName, { opacity: detailsOpacity }]}>John Doe</Animated.Text>
        <Animated.Text style={[styles.profileBio, { opacity: detailsOpacity }]}>
          Farmer | Rancher | Dreamer
        </Animated.Text>
      </View>

      <Animated.View style={[styles.statsContainer, { opacity: detailsOpacity }]}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>200</Text>
          <Text style={styles.statText}>Animals</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statText}>Farms</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statText}>Categories</Text>
        </View>
      </Animated.View>

       {/* Carousel of Images */}
       {!isEditing && (
        <View style={styles.carouselContainer}>
          <FlatList
            data={images}
            renderItem={renderImage}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* Animated Edit Form */}
      <Animated.View
        style={[
          styles.editFormContainer,
          {
            opacity: formOpacity,
            transform: [{ translateY: formSlideUp }],
          },
        ]}
      >
        <Text style={styles.formTitle}>Edit Profile</Text>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Bio" />
        <TextInput style={styles.input} placeholder="Change Password" secureTextEntry />
        <Pressable style={styles.saveButton} onPress={() => alert('Profile Updated')}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  carouselContainer: {
    marginVertical: 20,
  },
  imageContainer: {
    width: screenWidth - 40,
    marginRight: 10,
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  editText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileBio: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  editFormContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
