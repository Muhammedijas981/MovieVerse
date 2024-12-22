import { createStyles, useTheme } from "@/assets/utils/theme"
import { StyleSheet, View, Text } from "react-native"
import { isTablet, scale } from "@/assets/utils/responsive";
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = { popularity: number }
const Popularity = ({ popularity }: Props) => {
    const styles = useStyles()
    const theme = useTheme()

    // Ensure popularity is between 0 and 100
    const normalizedPopularity = Math.min(Math.max(popularity, 0), 100);

    return (
        <View style={styles.root}>
            <AntDesign 
                name="rocket1" 
                size={scale(12)} 
                color={theme.colors.onSecondary} 
                style={styles.icon}
            />
            <View style={styles.barContainer}>
                <View style={styles.bar}>
                    <View 
                        style={[
                            styles.popularity, 
                            { width: `${normalizedPopularity}%` }
                        ]}
                    >
                        <Text style={styles.label}>{normalizedPopularity}%</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const useStyles = createStyles((theme) => StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(20),
    },
    icon: {
        marginRight: scale(8)
    },
    barContainer: {
        flex: 1,
    },
    bar: {
        height: scale(10),
        backgroundColor: 'grey',
        borderRadius: scale(4),
        overflow: 'hidden'
    },
    popularity: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: scale(4),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    label: {
        position: 'absolute',
        right: scale(4),
        color: theme.colors.background,
        fontSize: scale(7),
        fontFamily: 'Poppins_700Bold'
    }
}))

export default Popularity