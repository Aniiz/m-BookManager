import ISBNGet from "./request/ISBNGet";
import ValidISBN from "./ValidISBN";
import { ToastAndroid } from "react-native";
import translations from '../../translation/localization'

export default ISBN = async (ISBN) => {
    if (ISBN == '') {
        ToastAndroid.showWithGravity(
            translations.ISBNVazio,
            ToastAndroid.TOP,
            ToastAndroid.CENTER
        )

        return false
    }

    const valid = ValidISBN(ISBN)

    if (valid) {
        const bookData = await ISBNGet(ISBN);

        if (bookData) {
            return bookData

        } else {
            ToastAndroid.showWithGravity(
                translations.ISBNOff,
                ToastAndroid.TOP,
                ToastAndroid.CENTER
            )

            return false
        }

    } else {
        ToastAndroid.showWithGravity(
            translations.ISBNInvalido,
            ToastAndroid.TOP,
            ToastAndroid.CENTER
        )

        return false
    }
};