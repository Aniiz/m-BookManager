import { StyleSheet } from 'react-native';
import { colors } from '../../globalVariables/globalStyle';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.yellow
    },
    Text: {
        color: colors.white,
        fontSize: 24
    },
});