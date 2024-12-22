import React, { useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { scale, isTablet } from '@/assets/utils/responsive';
import { useTheme } from '@/assets/utils/theme';
import { Movie } from '@/constants/types';
import { useMovieContext } from '@/contexts/MovieContext';
import Card from './Card';
import { createStyles } from '@/assets/utils/theme';
import { StyleSheet } from 'react-native';

const MovieList = () => {
    const styles = useStyles();
    const theme = useTheme();
    const { state, fetchMovies } = useMovieContext();
    const [loading, setLoading] = useState(true);

    // Utility function for infinite scroll
    const loadMoreMovies = () => {
        if (!loading && state[state.currentFilter].page < state[state.currentFilter].total_pages) {
            setLoading(true);
            fetchMovies(state.currentFilter, state[state.currentFilter].page + 1).then(() => setLoading(false));
        }
    };

    // Logic for adjusting number of cards based on device
    const screenWidth = Dimensions.get('window').width;
    const getNumColumns = () => {
        if (isTablet()) {
            return Math.floor(screenWidth / 350); // For tablets, adjust based on width
        }
        return 2; // Always show 2 columns on mobile
    };

    const numColumns = getNumColumns();
    const cardWidth = screenWidth / numColumns;

    const renderItem = React.useCallback(({ item }: { item: Movie }) => (
        <Card movie={item} width={cardWidth} />
    ), [cardWidth]);

    return (
        <View style={styles.container}>
            <FlatList
                data={state[state.currentFilter].movies}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numColumns}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                key={numColumns} // Force re-render on orientation change
                onEndReached={loadMoreMovies}
                onEndReachedThreshold={0.5}
            />
            {/* {loading && (
                <View style={styles.loaderContainer}>
                    <Progress.Bar
                        indeterminate
                        width={200}
                        borderWidth={0}
                        color={theme.colors.primary}
                    />
                </View>
            )} */}
        </View>
    );
};

const useStyles = createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    listContainer: {
        paddingHorizontal: scale(5),
        alignItems: 'center',
        width: '100%',
    },
    loaderContainer: {
        position: 'absolute',
        bottom: scale(70),
        left: 0,
        right: 0,
        alignItems: 'center',
    }
}));

export default MovieList; 