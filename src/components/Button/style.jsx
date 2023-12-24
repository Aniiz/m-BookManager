import { StyleSheet } from 'react-native';
import { colors } from '../../globalVariables/globalStyle';

export const style = StyleSheet.create({
    container: {
        marginBottom: 30,
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 6,
    },
    texto: {
        color: colors.yellow,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
});