import { View, Text, ScrollView } from 'react-native';
import { style } from './style';

export default ({ navigation, children }) => {

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                {children}
            </ScrollView>
        </View>
    )
}