import { Redirect } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

// Root component that handles app initialization
export default function App() {
    // Load required Poppins font variants
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    useEffect(() => {
        // Hide splash screen once fonts are loaded
        async function prepare() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, [fontsLoaded]);

    useEffect(() => {
        // Enable device rotation support
        async function enableAllOrientations() {
            await ScreenOrientation.unlockAsync();
        }
        enableAllOrientations();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return <Redirect href="/(stack)/" />;
}
