import { Redirect } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, [fontsLoaded]);

    useEffect(() => {
        // Allow all orientations
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
