
import Onboarding from '@/components/Onboarding';
import { ThemedView } from '@/components/ThemedView';
import { View, StyleSheet} from 'react-native';

export default function OnboardingScreen() {

    return (

            <ThemedView style={styles.container}>
                <Onboarding/>
            </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});
