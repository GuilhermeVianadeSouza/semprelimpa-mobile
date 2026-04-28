import React, { useState } from "react";
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Background from "../components/common/Background";
import CabecalhoFixo from "../components/common/CabecalhoFixo";
import CardAutenticacao from "../components/tela-login/cadastre-se/CardAutenticacao";
import inputMascarado from "../components/common/inputMascarado";
import BotaoPadrao from "../components/common/BotaoPadrao";

import { textos } from "../utils/strings";
import { colors } from "../theme/colors";

export default function LoginScreen(){
    const [cpfVisual, setCpfVisual] = useState('')
    const [cpfPuro, setCpfPuro] = useState('')
    const [senha, setSenha] = useState('')

    const lidarComVoltar = () =>{
        console.log("Está tentando retornar")
    }

    const lidarComLogin = () => {
        console.log("Tentativa de Login:");
        console.log("CPF Puro enviado para API:", cpfPuro);
        console.log("Senha enviada:", senha);
    }

    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}
            />

            <CardAutenticacao
            titulo={textos.cardAuten.login}
            onBack = {lidarComVoltar}>
                <View style={styles.formConteudo}>
                    
                </View>
            </CardAutenticacao>
        </Background>
    )
}

const styles = StyleSheet.create({
    formConteudo: {
        flex: 1,
    },
    esqueciSenha: {
        alignSelf: 'flex-end',
        marginTop: -10,
        paddingVertical: 10
    },
    textoEsqueciSenha: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600'
    }
})