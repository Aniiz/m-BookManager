import { TouchableOpacity, Image } from "react-native";
import { style } from "./style";


export default ({ eventPress, src, marginleft, marginright, marginTop, size }) => {
    let render;
    src ? render = (
        <TouchableOpacity style={{
            ...style.container, marginLeft: marginleft,
            marginRight: marginright, marginTop: marginTop, height: size, width: size,
        }} onPress={eventPress}>
            <Image
                style={{ ...style.img, height: size, width: size }}
                source={src} />
        </TouchableOpacity>) : render = (
            <TouchableOpacity style={style.container} />
        )
    return render;
};