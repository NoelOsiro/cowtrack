import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/base';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { FONTFAMILY } from '@/constants/theme';

export function HeaderWithProfileIcon() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const handleProfilePress = () => {
        router.push('/') // Replace 'Profile' with your profile route name
    };

    const getInitials = (email: string | undefined) => {
        return email ? email.substring(0, 2).toUpperCase() : '';
    };

    return (
        <ThemedView style={styles.header}>
            <ThemedText style={styles.headerText}>Welcome, Noel</ThemedText>

            <Avatar
                rounded
                size="small"
                title={getInitials(user?.email ?? undefined)}
                containerStyle={styles.avatar}
                onPress={handleProfilePress}
                titleStyle={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 16, fontWeight: '800' }}
            />

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerText: {
        fontSize: 20,
        fontFamily: FONTFAMILY.poppins_bold,
    },
    avatar: {
        backgroundColor: '#cccccc', // Background color for initials
    },
});
