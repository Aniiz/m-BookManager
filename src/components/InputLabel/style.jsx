import { StyleSheet } from 'react-native';
import { colors } from '../../globalVariables/globalStyle';

export const style = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        fontSize: 15,
        color: colors.gray,
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 9
    },
    text: {
        fontSize: 18,
        color: colors.gray,
        marginBottom: 10,
        paddingLeft: 10
    }
});