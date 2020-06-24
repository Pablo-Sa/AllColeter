import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const Home = () => {
    const navigation = useNavigation();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUF, setSelectedUF] = useState<string>('Selecione a UF');
    const [selectedCity, setSelectedCity] = useState('Selecione a Cidade');

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const Ufinitials = response.data.map(uf => uf.sigla);
            setUfs(Ufinitials);
        })
    }, []);

    useEffect(() => {
        if (selectedUF !== 'Selecione a UF') {
            axios
                .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
                .then(response => {
                    const cityNames = response.data.map(city => city.nome);
                    setCities(cityNames);
                })
        }
    }, [selectedUF]);
    
    const placeholderUF = {
        label: 'Selecione a UF',
        value: 'Selecione a UF',
        color: '#9EA0A4',
    };

    const placeholderCity = {
        label: 'Selecione a Cidade',
        value: 'Selecione a Cidade',
        color: '#9EA0A4',
    };

    function handleNavigationToPoints(){
        navigation.navigate('Points',{
            selectedUF,
            selectedCity
        });
    }

    return (
        <ImageBackground source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos a encontrarem pontos de coleta de forma eficiente</Text>
            </View>

            <View style={styles.footer}>
            <RNPickerSelect 
                style={{
                    inputAndroid: {
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderWidth: 0.5,
                        borderColor: '#34CB79',
                        borderRadius: 8,
                        color: 'black',
                        paddingRight: 30,
                        marginBottom: 12,
                    }
                }}
               placeholder={placeholderUF}
               useNativeAndroidPickerStyle={false}
               onValueChange={value => {
                   placeholderUF.value = value;
                   setSelectedUF(value);
                   }}
               items={ufs.map(uf=>({ label: uf, value: uf }))}
            />
            <RNPickerSelect 
                style={{
                    inputAndroid: {
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderWidth: 0.5,
                        borderColor: '#34CB79',
                        borderRadius: 8,
                        color: 'black',
                        paddingRight: 30,
                        marginBottom: 8,
                    }
                }}
               placeholder={placeholderCity}
               useNativeAndroidPickerStyle={false}
               onValueChange={value => {
                    placeholderCity.value = value;
                    setSelectedCity(value);
                    }}
               items={cities.map(city=>({ label: city, value: city }))}
               key={String(cities)}
             /> 
                <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                           <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    select: {
        height: 60,
        
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;