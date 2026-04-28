import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaskInput, {Masks} from "react-native-mask-input";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { colors } from "../../theme/colors";

interface InputMascaradoPropriedades{
    label?: string
    placeholder?: string
    valor: string
    aoMudarTexto: (mascarado: string, puro: string) => void
    tipo: 'cpf' | 'email' | 'senha'
}

export default function inputMascarado({ label, placeholder, valor, aoMudarTexto, tipo}: InputMascaradoPropriedades){
    const [senhaOculta, setSenhaOculta] = useState(true) 

    const selecionarMascara = () => {
        if (tipo === 'cpf') return Masks.BRL_CPF
        return undefined
    }

    const definirTeclado = () => {
        if (tipo === 'cpf') return 'numeric'
        if (tipo === 'email') return 'email-address'
        return 'default'
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.label}>{label}</Text>

            <View style= {styles.inputArea}>
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