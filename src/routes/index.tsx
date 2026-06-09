import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AutentRoutes from "./autent";
import AppTabRoutes from "./AppTabRoutes";

import { useAuth } from "../routes/AuthContext";

export default function Routes() {

    const {
        usuarioLogado,
        carregando
    } = useAuth();

    if (carregando) {
        return null;
    }

    return (
        <NavigationContainer>
            {usuarioLogado
                ? <AppTabRoutes />
                : <AutentRoutes />
            }
        </NavigationContainer>
    );
}