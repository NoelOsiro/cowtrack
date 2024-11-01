import React from 'react';
import { Card, Icon, Text, } from '@rneui/themed';
import { StyleSheet, FlatList, View, Pressable, Linking, Image } from 'react-native';
import { FONTFAMILY } from '@/constants/theme';

type RecentChangesCardProps = {
  data: { id: number; description: string; date: string }[];
};


type ProfileCardProps = {
  name: string;
  title: string;
  rating: number;
  activity: number;
  imageUrl: string;
  onProfilePress: () => void;
  youtubeUrl?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, rating, activity, imageUrl, onProfilePress, youtubeUrl }) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardImg}>
          <Image source={{ uri: imageUrl }} style={styles.cardImgImage} accessibilityLabel={`Profile image of ${name}`} />
        </View>
        <View style={styles.desc}>
          <Text style={styles.primaryText}>{name}</Text>
          <Text style={styles.secondaryText}>{title}</Text>
        </View>
        <Pressable style={styles.button} onPress={onProfilePress}>
          <Text style={styles.buttonText}>View Profile</Text>
        </Pressable>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Text style={styles.primaryText}>{rating}%</Text>
            <Text style={styles.secondaryText}>Rating</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.primaryText}>{activity}%</Text>
            <Text style={styles.secondaryText}>Activity</Text>
          </View>
        </View>
        {youtubeUrl && (
          <Pressable style={styles.youtubeLink} onPress={() => Linking.openURL(youtubeUrl)}>
            <Text style={styles.youtubeLinkText}>Watch Me Code  <Text style={{ color: 'red' }}>&#9658;</Text></Text>
          </Pressable>
        )}
      </Card>
    </View>
  );
};


//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',   
//  // Center the card vertically if needed


const RecentChangesCard: React.FC<RecentChangesCardProps> = ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Recent Changes</Text>
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
    <ProfileCard 
    name={item.description} 
    title={item.date} 
    rating={50} 
    activity={50} 
    imageUrl="https://dl.dropbox.com/s/u3j25jx9tkaruap/Webp.net-resizeimage.jpg?raw=1" 
    onProfilePress={() => {}} />  
    )}
    contentContainerStyle={styles.listContent}
  />
   </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.poppins_bold,
    marginBottom: 10,
  },
  card: {
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  cardImg: {
    height: 120,
    width: 120,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  cardImgImage: {
    height: '86%',
    width: '86%',
    borderRadius: 50,
  },
  desc: {
    alignItems: 'center',
  },
  primaryText: {
    color: '#d5d5d5',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.7,
    marginBottom: 5,
  },
  secondaryText: {
    color: '#c0c0c0',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#d5d5d5',
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  detail: {
    alignItems: 'center',
  },
  listContent: {
    gap: 4,
  },
  youtubeLink: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  youtubeLinkText: {
    color: '#fff',
    fontSize: 14,
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
