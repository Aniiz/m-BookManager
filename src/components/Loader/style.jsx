import { StyleSheet } from 'react-native';
import { colors } from '../../globalVariables/globalStyle';

export const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    Text: {
        color: colors.green,
        fontSize: 24
    },
});