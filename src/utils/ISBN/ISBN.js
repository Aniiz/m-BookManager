import ISBNGet from "./request/ISBNGet";

export default ISBN = async (ISBN) => {
    if (ISBN == '' || ISBN.length < 10) {
        return false
    }

    return await ISBNGet(ISBN);
};