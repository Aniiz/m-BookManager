import ISBNGet from "./request/ISBNGet";
import ValidISBN from "./ValidISBN";

export default ISBN = async (ISBN) => {
    if (ISBN == '') {
        console.log('vazio')
        return false
    }

    const valid = ValidISBN(ISBN)

    if (valid) {
        const bookData = await ISBNGet(ISBN);

        if (bookData) {
            return bookData

        } else {
            console.log('ISBN não encontrado, utilize o cadastro manual')
            return false
        }

    } else {
        console.log('invalido')
        return false
    }
};