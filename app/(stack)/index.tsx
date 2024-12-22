import { View } from 'react-native';
import { Bar } from '@/components/Search';
import { createStyles } from '@/assets/utils/theme';
import { StyleSheet } from 'react-native';
import { scale } from '@/assets/utils/responsive';
import MovieList from '@/components/MovieList';
import BottomTabs from '@/components/BottomTabs';

const HomeScreen = () => {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Bar />
            <View style={styles.content}>
                <MovieList />
            </View>
            <BottomTabs />
        </View>
    );
};

const useStyles = createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        marginTop: scale(70),
        marginBottom: scale(60),
    },
}));

export default HomeScreen;