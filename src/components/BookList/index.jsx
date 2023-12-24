import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { colors, styles } from '../../globalVariables/globalStyle';
import { width } from '../../globalVariables/globalStyle';
import translations from '../../translation/localization';
import Button from '../Button';
import { style } from './style';

export default ({ navigation, dados, eventpress }) => {
    let render;
    let radius = 30
    let strokeWidth = 10

    const halfcircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius;

    const toEdit = (livro, index) => {
        navigation.navigate('Cadastrar', { 'savedBooks': dados, 'editBook': livro, 'index': index })
    }

    dados.length > 0 ?
        render = (
            <View style={{ paddingTop: 30, height: '100%' }}>
                <Button dados={translations.homeInserir} backgroundColor={colors.green} marginleft={'auto'} marginright={26} eventPress={eventpress} />

                <ScrollView style={style.container}>

                    {
                        dados.map((livro, index) => (
                            <TouchableOpacity style={style.containeritem} key={index} onPress={() => toEdit(livro, index)}>

                                <View style={style.containerUm}>
                                    <Svg
                                        width={radius * 2}
                                        height={radius * 2}
                                        viewBox={`0 0 ${halfcircle * 2} ${halfcircle * 2}`}
                                    >
                                        <G rotation='-90' origin={`${halfcircle}, ${halfcircle}`}>
                                            <Circle
                                                cx="50%"
                                                cy="50%"
                                                stroke={colors.green}
                                                strokeWidth={strokeWidth}
                                                r={radius}
                                                fill='transparent'
                                                strokeOpacity={0.4}
                                            />

                                            <Circle
                                                cx="50%"
                                                cy="50%"
                                                stroke={colors.green}
                                                strokeWidth={strokeWidth}
                                                r={radius}
                                                fill='transparent'
                                                strokeDasharray={circleCircumference}
                                                strokeDashoffset={circleCircumference * (1 - (livro.paginaLida / livro.paginas))}
                                                strokeLinecap='round'
                                            />
                                        </G>
                                    </Svg>
                                </View>

                                <View style={style.containerdois}>
                                    <Text style={style.tittle}>{livro.titulo}</Text>
                                    <Text style={style.text}>{livro.autor}</Text>
                                    <Text style={style.text}> Pag: {livro.paginaLida} - {livro.paginas}</Text>
                                </View>

                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        ) :
        render = (
            <View style={{ ...styles.container, backgroundColor: colors.yellow, ...styles.center }}>
                <View style={{ ...styles.center, paddingHorizontal: 15 }}>
                    <Image
                        source={require('../../../assets/noData.png')}
                        resizeMode='contain'
                        style={{ width: width - 80, height: width - 80 }}
                    />

                    <Text style={styles.fonte}>{translations.homeVazio}</Text>
                </View>
                <Button dados={translations.homeInserir} backgroundColor={colors.green} eventPress={eventpress} marginTop={'auto'} />
            </View >
        )
    return render;
}