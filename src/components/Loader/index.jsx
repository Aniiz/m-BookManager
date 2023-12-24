import { Text, View, ActivityIndicator } from "react-native";
import { style } from "./style";
import { colors } from "../../globalVariables/globalStyle";
import translations from "../../translation/localization"

export default ({ eventChange, text }) => {

    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={style.Text}>{text}</Text>
        </View>
    )
};