import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AutentRoutes from "./autent";
import AppTabRoutes from "./AppTabRoutes";

import { verificarSeEstaLogado } from "../services/authService";

export default function Routes() {

    // Guarda se usuário está autenticado
    const [usuarioLogado, setUsuarioLogado] = useState(false)

    // Controla carregamento inicial
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {

        async function verificarLogin() {

            try {

                const logado = await verificarSeEstaLogado()

                setUsuarioLogado(logado)

            } catch (error) {

                console.log("Erro ao verificar login:", error)

            } finally {

                setCarregando(false)

            }
        }

        verificarLogin()

    }, [])

    // Enquanto verifica token
    if (carregando) {
        return null
    }

    return (
        <NavigationContainer>

            {usuarioLogado
                ? <AppTabRoutes />
                : <AutentRoutes />
            }
        </NavigationContainer>
    )
}