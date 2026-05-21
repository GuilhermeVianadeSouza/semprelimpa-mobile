import React from "react";
import { View, Image,Text } from "react-native";

interface HeaderHomePropriedades{
    nomeUsuario: string
    urlFotoPerfil?: string
    onPressNotificacao: () => void
}

export default function HeaderHome({
    nomeUsuario,
    urlFotoPerfil,
    onPressNotificacao
}: HeaderHomePropriedades) {
    const imagemPadrao = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

    return (
        <View>
            <View>
                <Image 
                source={{uri: urlFotoPerfil ? urlFotoPerfil : imagemPadrao}}
                />
                <View>
                    <Text></Text>
                </View>
            </View>
        </View>
    )
}