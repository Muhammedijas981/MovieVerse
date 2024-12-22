import { StyleSheet } from 'react-native';
import { scale, isTablet, moderateScale, verticalScale } from '@/assets/utils/responsive';
import { createStyles } from '@/assets/utils/theme';

export default createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: theme.spacing.m,
    },
    top: {
        flex: 1,
        minHeight: verticalScale(isTablet() ? 350 : 400),
    },
    header: {
        height: verticalScale(40),
        flexDirection: 'row',
        paddingHorizontal: scale(isTablet() ? 10 : 5),
        alignItems: 'center'
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ios: {
        ...theme.textVariants.title,
        color: theme.colors.primary,
        marginLeft: scale(5)
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scale(isTablet() ? 10 : 20),
        paddingHorizontal: scale(10)
    },
    poster: {
        width: '100%',
        height: '100%',
        maxWidth: moderateScale(isTablet() ? 400 : 300),
        maxHeight: moderateScale(isTablet() ? 400 : 400),
        borderRadius: scale(20)
    },
    bottom: {
        flex: 1,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(isTablet() ? 5 : 10),
        minHeight: verticalScale(isTablet() ? 250 : 300),
        gap: isTablet() ? scale(8) : undefined
    },
    name: {
        ...theme.textVariants.header,
        fontSize: scale(isTablet() ? 28 : 20),
        color: theme.colors.onSecondary,
        marginBottom: scale(isTablet() ? 8 : 2)
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scale(isTablet() ? 8 : 15)
    },
    date: {
        ...theme.textVariants.body,
        color: 'grey',
        fontSize: scale(isTablet() ? 16 : 12),
        marginRight: scale(10)
    },
    popularity: {
        marginVertical: verticalScale(isTablet() ? 8 : 15)
    },
    popularity_label: {
        color: theme.colors.onSecondary,
        fontSize: scale(isTablet() ? 12 : 8),
        marginBottom: verticalScale(isTablet() ? 3 : 5)
    },
    description: {
        ...theme.textVariants.body,
        color: theme.colors.onSecondary,
        fontFamily: 'Poppins_400Regular',
        fontSize: scale(isTablet() ? 14 : 8),
        lineHeight: scale(isTablet() ? 20 : 12),
        opacity: 0.7,
        letterSpacing: 0.3
    }
}));