import { TouchableOpacity, Text } from "react-native";
import { style } from "./style";
import { colors } from "../../globalVariables/globalStyle";

export default ({ eventPress, dados, marginleft, marginright, marginTop, backgroundColor, selected, color, width }) => {
    let render;

    if (!color) {
        color = 'white'
    }

    if (selected) {
        var backgroundColor = 'transparent'
        var borderColor = 'white'
        var borderWidth = 2
        color = 'white'

    }

    dados ? render = (
        <TouchableOpacity style={{
            ...style.container, marginLeft: marginleft,
            marginRight: marginright, marginTop: marginTop, backgroundColor: backgroundColor, borderWidth: borderWidth, borderColor: borderColor, width: width
        }} onPress={eventPress}>
            <Text style={{ ...style.texto, color: color }}>{dados}</Text>
        </TouchableOpacity>) :
        render = (
            <TouchableOpacity style={style.container} />
        )

    return render;
};