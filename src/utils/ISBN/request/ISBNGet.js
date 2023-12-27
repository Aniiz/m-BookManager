import { urlBook } from '../../../globalVariables/url'

export default ISBNGet = async (ISBN) => {
    try {
        const respostaGet = await fetch(`${urlBook}${ISBN}.json`);
        console.log(respostaGet)
        if (respostaGet.status === 200) { return await respostaGet.json(); }
        return false;

    } catch (error) {
        console.error("Erro ao obter o livro:", error);
        return false;
    }
};