import { useEffect, useState } from "react";
import { buscarDadosHome } from "../services/homeService";
import { buscarPerfilUsuario } from "../services/authService";

export function useHome() {
    const [dados, setDados] = useState<any[]>([]);
    const [usuario, setUsuario] = useState<any>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarHome() {
        try {
            setCarregando(true);

            const [responseHome, responsePerfil] =
                await Promise.all([
                    buscarDadosHome(),
                    buscarPerfilUsuario()
                ]);

            setDados(responseHome.items.Usuario);

            setUsuario(
                responsePerfil.items.Usuario[0]
            );

        } catch (error: any) {
            setErro(error.message);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarHome();
    }, []);

    return {
        dados,
        usuario,
        carregando,
        erro,
        recarregar: carregarHome
    };
}