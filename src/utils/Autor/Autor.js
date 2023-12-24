import autorGet from "./request/AutorGet";

export default Autor = async (autor) => {
    return await autorGet(autor);
};