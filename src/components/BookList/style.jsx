import { StyleSheet } from 'react-native';
import { colors } from '../../globalVariables/globalStyle'

export const style = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        paddingHorizontal: 10,
    },
    containeritem: {
        marginVertical: 5,
        borderColor: colors.yellow,
        borderBottomWidth: 2,
        flexDirection: 'row',
    },
    containerUm: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerdois: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 10
    },
    tittle: {
        color: colors.black,
        fontSize: 19,
        marginBottom: 5,
        textAlign: 'justify'
    },
    text: {
        color: colors.gray,
        fontSize: 16,
        marginLeft: 10,
    },
});