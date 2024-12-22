import { useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { scale, moderateScale } from './responsive';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

/*
  This file handles the theme changes, provides a hook for consumers to track the theme changes,
  and takes care of the theming of the navbar and status bar.
*/

const palette = {
  white: 'rgb(251 248 255)',
  black: "#000000",
  grey: "rgb(27 27 33)"
};

interface ThemeColors {
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
  star: string;
}

const lightTheme: ThemeColors = {
  primary: "rgba(255, 85, 36, 1)",
  onPrimary: palette.black,
  secondary: "rgba(255, 85, 36, 1",
  onSecondary: palette.black,
  tertiary: "rgb(204 51 255)",
  onTertiary: palette.black,
  background: palette.white,
  onBackground: palette.black,
  surface: palette.grey,
  onSurface: palette.black,
  error: "rgb(255 26 26)",
  onError: palette.white,
  star: "rgba(225, 205, 23, 1)",
};

const darkTheme: ThemeColors = {
  primary: "rgba(255, 85, 36, 1)",
  onPrimary: palette.white,
  secondary: "rgba(51, 51, 51, 1)",
  onSecondary: palette.white,
  tertiary: "rgb(115 0 153)",
  onTertiary: "rgba(255, 85, 36, 1",
  background: "rgb(19 19 24)",
  onBackground: palette.white,
  surface: palette.black,
  onSurface: palette.white,
  error: "rgb(204 0 0)",
  onError: palette.white,
  star: "rgba(225, 205, 23, 1)",
};

// Hook to get the current theme
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors: ThemeColors = isDark ? darkTheme : lightTheme;

  const setNavigationBarColor = async () => {
    await NavigationBar.setBackgroundColorAsync(colors.background);
    await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    setStatusBarBackgroundColor(colors.background, true)
  };

  setNavigationBarColor();

  return {
    isDark,
    colors,
    spacing: {
      s: moderateScale(5),
      m: moderateScale(16),
      l: moderateScale(24),
      xl: moderateScale(45),
    },
    textVariants: {
      header: {
        fontFamily: 'Poppins_700Bold',
        fontSize: scale(34),
      },
      title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: scale(12),
        fontWeight: '500' as const,
      },
      body: {
        fontFamily: 'Poppins_400Regular',
        fontSize: scale(10),
      },
      button: {
        fontFamily: 'Poppins_500Medium',
        fontSize: scale(14),
        fontWeight: '500' as const,
      },
    },
  };
};

// Type for style functions
type StylesFunction = (theme: ReturnType<typeof useTheme>) => { [key: string]: any };

// Function to create responsive styles
export const createStyles = (stylesFunction: StylesFunction) => {
  return () => {
    const theme = useTheme();
    const baseStyles = stylesFunction(theme);
    
    return baseStyles;
  };
};