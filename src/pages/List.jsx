import { View, Image, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { colors, styles } from '../globalVariables/globalStyle'
import translations from '../translation/localization';
import { width, height } from '../globalVariables/globalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';

import BookList from '../components/BookList';
import Button from '../components/Button';
import Loader from '../components/Loader';

export default function List({ navigation, route }) {
    const [Livros, setLivros] = useState([]);
    const [Loading, setLoading] = useState(true)

    const handleUserData = async () => {
        const teste = JSON.parse(await AsyncStorage.getItem('Livros'))
        if (teste) setLivros(teste)
        console.log(teste)
    }

    const toCadastrar = () => {
        navigation.navigate('Cadastrar', { 'savedBooks': Livros, 'editBook': false })
    }

    useEffect(() => {
        navigation.addListener("focus", async () => {
            await handleUserData()
            setLoading(false)
        })
    }, []);

    let render;

    Loading ?
        render = (
            <Loader text={translations.LoadPage} />
        )

        : render = (
            <View style={{ ...styles.container, backgroundColor: colors.yellow }}>

                <BookList dados={Livros} eventpress={toCadastrar} navigation={navigation} />
            </View >
        )

    return render;
}