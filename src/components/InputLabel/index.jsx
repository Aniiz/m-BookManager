import { TextInput, Text, View, KeyboardAvoidingView } from "react-native";
import { style } from './style';
import { colors } from "../../globalVariables/globalStyle";

export default ({ val, eventChange, placeholder, secure, maxLength, text, type = null, marginBottom, marginTop }) => {

    return (
        <View style={{ ...style.container, marginBottom: marginBottom, marginTop: marginTop }}>
            <Text style={style.text}>{text}</Text>

            <TextInput
                style={style.input}
                onChangeText={eventChange}
                placeholder={placeholder}
                secureTextEntry={secure}
                maxLength={maxLength}
                keyboardType={type}
                value={val}
            />
        </View>)
};