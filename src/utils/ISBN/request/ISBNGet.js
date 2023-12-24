import { urlBook } from '../../../globalVariables/url'

export default ISBNGet = async (ISBN) => {
    const respostaGet = await fetch(`${urlBook}${ISBN}.json`);

    if (respostaGet.status === 200) return await respostaGet.json();
    return false
};