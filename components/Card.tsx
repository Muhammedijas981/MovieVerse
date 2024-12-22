import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Movie } from "@/constants/types";
import { formatReleaseDate, image } from "@/api";
import { createStyles, useTheme } from "@/assets/utils/theme";
import { isTablet, scale, verticalScale } from "@/assets/utils/responsive";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = { movie: Movie; width: number };

const Card = React.memo(({ movie, width }: Props) => {
    const theme = useTheme();
    const styles = useStyles();
    const [isLoading, setIsLoading] = useState(false);
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
        <Link href={`/(stack)/${movie.id}`}>
            <View style={[styles.movie, { width }]}>
                <View style={styles.card}>
                    {isLoading && (
                        <View style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
                            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                                <AntDesign name="loading1" size={scale(30)} color={theme.colors.primary} />
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
                    <Text numberOfLines={1} style={styles.title}>
                        {movie.original_title}
                    </Text>
                </View>
            </View>
        </Link>
    );
});

const useStyles = createStyles((theme) => StyleSheet.create({
    movie: {
        height: verticalScale(isTablet() ? 350 : 280),
        paddingHorizontal: scale(6),
        paddingVertical: scale(6),
        width: '50%',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    poster: {
        width: '100%',
        height: '85%',
        borderRadius: scale(8),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        ...theme.textVariants.title,
        color: theme.colors.onSecondary,
        fontSize: scale(12),
        marginTop: scale(6),
        textAlign: 'center',
        width: '100%'
    }
}));

export default Card;
