import { urlAuthor } from '../../../globalVariables/url'

export default AutorGet = async (key) => {
    const respostaGet = await fetch(`${urlAuthor}${key}.json`);

    if (respostaGet.status === 200) return await respostaGet.json();
    return false
};