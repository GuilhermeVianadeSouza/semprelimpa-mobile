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


}