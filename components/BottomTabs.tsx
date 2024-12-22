import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createStyles, useTheme } from '@/assets/utils/theme';
import { scale, isTablet } from '@/assets/utils/responsive';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useMovieContext, MovieState } from '@/contexts/MovieContext';

const tabConfig: Array<{
    key: MovieState['currentFilter'];
    label: string;
    icon: keyof typeof AntDesign.glyphMap;
}> = [
    { key: 'trending', label: 'Trending', icon: 'barschart' },
    { key: 'upcoming', label: 'Upcoming', icon: 'calendar' },
    { key: 'nowPlaying', label: 'Now Playing', icon: 'playcircleo' },
    { key: 'topRated', label: 'Top Rated', icon: 'star' },
];

const BottomTabs = () => {
    const theme = useTheme();
    const styles = useStyles();
    const { state, dispatch } = useMovieContext();

    const handleTabPress = (filter: MovieState['currentFilter']) => {
        dispatch({ type: 'SET_FILTER', payload: filter });
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                {tabConfig.map((tab) => (
                    <Pressable
                        key={tab.key}
                        style={[
                            styles.tab,
                            state.currentFilter === tab.key && styles.activeTab
                        ]}
                        onPress={() => handleTabPress(tab.key)}
                    >
                        <View style={[
                            styles.iconContainer,
                            state.currentFilter === tab.key && styles.activeIconContainer
                        ]}>
                            <AntDesign
                                name={tab.icon}
                                size={scale(isTablet() ? 16 : 12)}
                                color={state.currentFilter === tab.key ? theme.colors.primary : theme.colors.onSecondary}
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                state.currentFilter === tab.key && styles.activeLabel
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const useStyles = createStyles((theme) => StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.background,
        borderTopWidth: 0.5,
        borderTopColor: theme.colors.secondary,
        paddingBottom: scale(isTablet() ? 15 : 8),
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingTop: scale(8),
        paddingHorizontal: scale(8),
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(3),
    },
    iconContainer: {
        width: scale(isTablet() ? 18 : 14),
        height: scale(isTablet() ? 18 : 14),
        borderRadius: scale(isTablet() ? 9 : 9),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scale(2),
    },
    activeIconContainer: {
        transform: [{ scale: 1.1 }],
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    activeTab: {
        transform: [{ translateY: -3 }],
    },
    label: {
        color: theme.colors.onSecondary,
        fontSize: scale(isTablet() ? 9 : 6),
        fontFamily: 'Poppins_400Regular',
        marginTop: scale(1),
        opacity: 0.8,
    },
    activeLabel: {
        color: theme.colors.primary,
        fontFamily: 'Poppins_500Medium',
        opacity: 1,
    },
}));

export default BottomTabs; 