import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { colors, styles } from '../globalVariables/globalStyle'
import translations from '../translation/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ButtonIcon from '../components/ButtonIcon';
import Button from '../components/Button'
import WhiteView from '../components/WhiteView';
import InputLabel from '../components/InputLabel';

import ISBN from '../utils/ISBN/ISBN';
import Autor from '../utils/Autor/Autor';
import Loader from '../components/Loader';

export default function Cadastrar({ navigation, route }) {
    const [rendertype, setrendertype] = useState('ISBN')
    const [Json, setJson] = useState(route.params.savedBooks);
    const [editBook, setEditBook] = useState(route.params.editBook);
    const [index, setIndex] = useState(route.params.index);

    const [isbnUser, setisbnUser] = useState('');
    const [tittleUser, settittleUser] = useState('');
    const [autorUser, setautorUser] = useState('');
    const [totalPaginaUser, setTotalPaginaUser] = useState('');
    const [pageLidaUser, setPageLidaUser] = useState('');
    const [loading, setLoading] = useState(false);

    const toList = () => { navigation.navigate("List") }
    const renderISBN = () => { setrendertype('ISBN') }
    const renderManual = () => { setrendertype('Manual') }

    const handleISBN = ISBN => setisbnUser(ISBN)

    const handleTittle = tittle => settittleUser(tittle)
    const handleAutor = autor => setautorUser(autor)
    const handleTotalPaginaUser = Pagina => setTotalPaginaUser(Pagina)
    const handlePageLidaUser = PagLida => setPageLidaUser(PagLida)

    const handleJson = Json => setJson(Json);

    const searchISBN = async () => {
        // colocar verificação de enviar solicitaçao sometnte se tiver isbn escrito, talvez mandar uma mensagem pro usuário
        const resp = await ISBN(isbnUser)

        if (resp) {
            const autorKey = resp.authors[0].key
            const respAutor = await Autor(autorKey)
            if (respAutor) {
                handleTittle(resp.title)
                handleAutor(respAutor.name)
                handleTotalPaginaUser(`${resp.number_of_pages}`)
                handleISBN('')
                renderManual()
            }
        }
    }

    useEffect(() =>
        navigation.addListener("focus", async () => {
            if (editBook) {
                renderManual()
                handleTittle(editBook.titulo)
                handleAutor(editBook.autor)
                handlePageLidaUser(editBook.paginaLida)
                handleTotalPaginaUser(editBook.paginas)
            }
        })
    );

    const saveData = async () => {
        // Verificações de validação
        const isValidTitulo = /^[^\s]+/.test(tittleUser.trim());
        const isValidAutor = /^[^\s]+/.test(autorUser.trim());
        const isValidTotalPaginas = totalPaginaUser > 0;
        const isValidPaginasLidas = pageLidaUser.trim() !== '' && parseInt(pageLidaUser, 10) >= 0 && parseInt(pageLidaUser, 10) <= parseInt(totalPaginaUser, 10);

        // Verificações antes de prosseguir
        if (!isValidTitulo) {
            console.log('O título não é válido. Deve ser uma string não vazia.');
            return; // Retorna sem continuar se não for válido
        }
        if (!isValidAutor) {
            console.log('O autor não é válido. Deve ser uma string não vazia.');
            return; // Retorna sem continuar se não for válido
        }
        if (!isValidTotalPaginas) {
            console.log('O número total de páginas não é válido. Deve ser maior que zero.');
            return; // Retorna sem continuar se não for válido
        }
        if (!isValidPaginasLidas) {
            console.log('O número de páginas lidas não é válido. Deve estar entre 0 e o total de páginas.');
            return; // Retorna sem continuar se não for válido
        }

        if (editBook) {
            const updatedJson = Json.filter((_, idx) => idx !== index);
            const book = { "autor": autorUser, "titulo": tittleUser, "paginas": totalPaginaUser, "paginaLida": pageLidaUser }
            updatedJson.push(book)

            updatedJson.sort((a, b) => {
                if (a.titulo < b.titulo) {
                    return -1;
                }
                if (a.titulo > b.titulo) {
                    return 1;
                }
                return 0;
            });

            await AsyncStorage.setItem('Livros', JSON.stringify(updatedJson))
        }
        if (!editBook) {
            const book = { "autor": autorUser, "titulo": tittleUser, "paginas": totalPaginaUser, "paginaLida": pageLidaUser }
            Json.push(book)

            Json.sort((a, b) => {
                if (a.titulo < b.titulo) {
                    return -1;
                }
                if (a.titulo > b.titulo) {
                    return 1;
                }
                return 0;
            });

            await AsyncStorage.setItem('Livros', JSON.stringify(Json))
        }
        navigation.navigate("List")
    }

    const ExcludeData = async () => {
        if (editBook) {
            setLoading(true);
            const updatedJson = Json.filter((_, idx) => idx !== index);
            await AsyncStorage.setItem('Livros', JSON.stringify(updatedJson));
            navigation.navigate("List");
            setLoading(false)
        }
    }

    let render;

    loading ? render = (<Loader text={translations.LoadExcluindo} />) :

        rendertype == 'ISBN' ?
            render = (
                <View style={{ ...styles.container, backgroundColor: colors.yellow }}>
                    <ButtonIcon src={require('../../assets/backArrow.png')} marginleft={10} marginTop={10} size={23} eventPress={toList} ></ButtonIcon>

                    <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                        <Button dados={translations.CadastrarISBN} marginTop={30} eventPress={renderISBN} selected={true} />
                        <Button dados={translations.CadastrarManual} backgroundColor={colors.green} marginTop={30} eventPress={renderManual} />
                    </View>

                    <WhiteView>
                        <InputLabel type={'numeric'} text={'ISBN:'} marginBottom={20} val={isbnUser} eventChange={handleISBN} maxLength={20} placeholder={translations.CadastrarPlaceHolderISBN}></InputLabel>
                        <Button dados={translations.CadastrarPesquisar} color={colors.white} backgroundColor={colors.green} marginTop={'auto'} eventPress={searchISBN} />
                    </WhiteView>
                </View >) :
            render = (
                !editBook ? (
                    <View style={{ ...styles.container, backgroundColor: colors.yellow }}>
                        <ButtonIcon src={require('../../assets/backArrow.png')} marginleft={10} marginTop={10} size={23} eventPress={toList} ></ButtonIcon>

                        <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                            <Button dados={translations.CadastrarISBN} backgroundColor={colors.green} marginTop={30} eventPress={renderISBN} />
                            <Button dados={translations.CadastrarManual} marginTop={30} eventPress={renderManual} selected={true} />
                        </View>

                        <WhiteView>
                            <InputLabel text={translations.CadastrarTituloISBN} marginBottom={20} val={tittleUser} eventChange={handleTittle} maxLength={50} placeholder={translations.CadastrarPlaceHolderTittle}></InputLabel>

                            <InputLabel text={translations.CadastrarTituloAutor} marginBottom={20} val={autorUser} eventChange={handleAutor} maxLength={50} placeholder={translations.CadastrarPlaceHolderAutor}></InputLabel>

                            <InputLabel type={'numeric'} text={translations.CadastrarTituloTotalPagina} marginBottom={20} val={totalPaginaUser} eventChange={handleTotalPaginaUser} maxLength={50} placeholder={translations.CadastrarPlaceHolderTotalPagina}></InputLabel>

                            <InputLabel type={'numeric'} text={translations.CadastrarTituloPaginaLida} marginBottom={20} val={pageLidaUser} eventChange={handlePageLidaUser} placeholder={translations.CadastrarPlaceHolderTotalPaginaLida} maxLength={50}></InputLabel>

                            <Button dados={translations.CadastrarSalvar} color={colors.white} backgroundColor={colors.green} marginTop={'auto'} eventPress={saveData} />
                        </WhiteView>
                    </View >
                )
                    :
                    (
                        <View style={{ ...styles.container, backgroundColor: colors.yellow }}>
                            <ButtonIcon src={require('../../assets/backArrow.png')} marginleft={10} marginTop={10} size={23} eventPress={toList} ></ButtonIcon>

                            <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                                <Button dados={translations.CadastrarISBN} backgroundColor={colors.green} marginTop={30} eventPress={renderISBN} />
                                <Button dados={translations.CadastrarManual} marginTop={30} eventPress={renderManual} selected={true} />
                            </View>

                            <WhiteView>
                                <InputLabel text={translations.CadastrarTituloISBN} marginBottom={20} val={tittleUser} eventChange={handleTittle} maxLength={50} placeholder={translations.CadastrarPlaceHolderTittle}></InputLabel>

                                <InputLabel text={translations.CadastrarTituloAutor} marginBottom={20} val={autorUser} eventChange={handleAutor} maxLength={50} placeholder={translations.CadastrarPlaceHolderAutor}></InputLabel>

                                <InputLabel type={'numeric'} text={translations.CadastrarTituloTotalPagina} marginBottom={20} val={totalPaginaUser} eventChange={handleTotalPaginaUser} maxLength={50} placeholder={translations.CadastrarPlaceHolderTotalPagina}></InputLabel>

                                <InputLabel type={'numeric'} text={translations.CadastrarTituloPaginaLida} marginBottom={20} val={pageLidaUser} eventChange={handlePageLidaUser} placeholder={translations.CadastrarPlaceHolderTotalPaginaLida} maxLength={50}></InputLabel>

                                <View style={{ ...styles.row, justifyContent: 'space-around' }}>
                                    <Button dados={translations.CadastrarSalvar} color={colors.white} backgroundColor={colors.green} eventPress={saveData} marginright={6} />
                                    <Button dados={translations.CadastrarExcluir} color={colors.white} backgroundColor={colors.gray} eventPress={ExcludeData} />
                                </View>
                            </WhiteView>
                        </View >
                    )
            )


    return render;
}