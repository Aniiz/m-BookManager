import { StyleSheet, Dimensions, Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export const { width, height } = Dimensions.get('window');

export const colors = { yellow: '#F9EA85', green: '#13C5B7', gray: '#8F98A6', white: '#ffffff', black: '#000000' }
export const phoneBar = STATUSBAR_HEIGHT

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: width,
        paddingTop: STATUSBAR_HEIGHT,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    fonte: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    }
})