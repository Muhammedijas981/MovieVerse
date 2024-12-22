import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, Animated, Easing } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { scale, useOrientation } from '@/assets/utils/responsive';
import { useTheme } from '@/assets/utils/theme';
import { Image } from 'expo-image';
import { useMovieContext } from '@/contexts/MovieContext';
import { Movie } from '@/constants/types';
import { formatReleaseDate, image } from '@/api'

import AntDesign from '@expo/vector-icons/AntDesign';
import Genres from '@/components/Gentre';
import Popularity from '@/components/Popularity';
import Ratings from '@/components/Rating';
import useStyles from './styles/movieDetail.styles'

const MovieDetailScreen = () => {
    const styles = useStyles()
    const orientation = useOrientation()
    const theme = useTheme()
    const navigation = useNavigation()

    const { id } = useLocalSearchParams<{ id: string }>();
    const { state } = useMovieContext();

    const movie = state[state.currentFilter].movies.find((m) => m.id === parseInt(id));
    
    if (!movie) {
        return null; // or a loading/error state
    }

    const isLandscape = orientation === 'landscape';

    const [isLoading, setIsLoading] = React.useState(false);
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            spinValue.setValue(0);
        }
    }, [isLoading]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                contentContainerStyle={[
                    styles.scrollContainer,
                    { flexDirection: isLandscape ? 'row' : 'column' }
                ]}
            >
                <View style={[
                    styles.top,
                    isLandscape && { width: '50%' }
                ]}>
                    <View style={styles.header}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                            <AntDesign name="left" size={scale(15)} color={theme.colors.primary} />
                            <Text style={styles.ios}>Back</Text>
                        </Pressable>
                    </View>
                    <View style={styles.backdrop}>
                        {isLoading && (
                            <View style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background, borderRadius: scale(20) }}>
                                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                                    <AntDesign name="loading1" size={scale(50)} color={theme.colors.primary} />
                                </Animated.View>
                            </View>
                        )}
                        <Image
                            style={styles.poster}
                            source={image(movie.poster_path)}
                            contentFit="cover"
                            onLoadStart={() => setIsLoading(true)}
                            onLoadEnd={() => setIsLoading(false)}
                        />
                    </View>
                </View>
                <View style={[
                    styles.bottom,
                    isLandscape && { width: '50%', paddingTop: scale(50) }
                ]}>
                    <Text style={styles.name}>{movie.original_title}</Text>
                    <View style={styles.info}>
                        <Text style={styles.date}>Released {formatReleaseDate(movie.release_date)}</Text>
                    </View>
                    <Ratings rating={movie.vote_average} />
                    <View style={{marginTop: scale(15)}}>{movie.genre_ids.length > 0 && <Genres genres_id={movie.genre_ids.slice(0, 3)} />}</View>
                    <View style={styles.popularity}>
                        <Text style={styles.popularity_label}>popularity</Text>
                        <Popularity popularity={movie.popularity} />
                    </View>
                    <Text style={styles.description}>{movie.overview}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MovieDetailScreen;