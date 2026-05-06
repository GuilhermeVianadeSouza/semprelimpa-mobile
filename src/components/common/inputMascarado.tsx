import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import MaskInput, {Masks} from "react-native-mask-input";
import { MASCARA_CEP } from "../../utils/formatadores";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { colors } from "../../theme/colors";

interface InputMascaradoPropriedades{
    label?: string
    placeholder?: string
    valor: string
    aoMudarTexto: (mascarado: string, puro: string) => void
    tipo: 'cpf' | 'email' | 'senha' | 'telefone' | 'cep' | 'data' | 'texto'
    editavel?: boolean
    containerStyle?: StyleProp<ViewStyle>
}

export default function InputMascarado({ label, placeholder, valor, aoMudarTexto, tipo, containerStyle, editavel = true}: InputMascaradoPropriedades){
    const [senhaOculta, setSenhaOculta] = useState(true) 

    const selecionarMascara = () => {
        if (tipo === 'cpf') return Masks.BRL_CPF
        if (tipo === 'telefone') return Masks.BRL_PHONE
        if (tipo === 'cep') return MASCARA_CEP
        if (tipo === 'data') return Masks.DATE_DDMMYYYY
        return undefined
    }

    const definirTeclado = () => {
        if (tipo === 'cpf' || tipo ==='telefone' || tipo === 'cep' || tipo === 'data') return 'numeric'
        if (tipo === 'email') return 'email-address'
        return 'default'
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style = {styles.label}>{label}</Text>}

            <View style= {[styles.inputArea, !editavel && {backgroundColor: colors.alertColorSistem, opacity: 0.7}]}>
                <MaskInput
                style={[styles.input, tipo === 'senha' && styles.inputComIcone]}
                placeholder={placeholder}
                placeholderTextColor={colors.defaultText}
                value={valor}
                mask={selecionarMascara()}
                onChangeText={(masked, unmasked) =>{
                    aoMudarTexto(masked, unmasked)
                }}
                keyboardType={definirTeclado()}
                autoCapitalize="none"

                secureTextEntry={tipo === 'senha' ? senhaOculta: false}
                editable = {editavel}
                />
                {tipo === 'senha' && (
                    <TouchableOpacity
                    onPress={() => setSenhaOculta(!senhaOculta)}
                    style={styles.iconeContainer}
                    activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                        name={senhaOculta ? "eye-off" : "eye"}
                        size={22}
                        color={colors.defaultText}/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20
    },
    label: {
        fontSize: 15,
        color: colors.textSecundary,
        marginBottom: 8,
        fontWeight: '600'
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 15
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        color: colors.defaultText
    },
    inputComIcone: {
        paddingRight: 50,
    },
    iconeContainer:{
        position: 'absolute',
        right: 0,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 16
    }
})