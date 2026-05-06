import React from 'react';
import CabecalhoFixo from '../components/common/CabecalhoFixo';
import Background from '../components/common/Background';
import BotaoPadrao from '../components/common/BotaoPadrao';
import InputMascarado from '../components/common/inputMascarado';
import { textos } from '../utils/strings';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAutenticacao from '../components/tela-login/cadastre-se/CardAutenticacao';

export default function CadastroScreen() {
    const navigation = useNavigation<any>()

    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}/>

            <CardAutenticacao
            titulo= {textos.cardAuten.cadastra}
            onBack={}>

            </CardAutenticacao>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    }
});