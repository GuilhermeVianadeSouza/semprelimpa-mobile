import api from "./api";
import { obterUsuarioLogado } from "./authService";

export async function buscarDadosHome() {
    const usuario = await obterUsuarioLogado();

    const response = await api.get(
        `/usuario/${usuario.usuario_id}`
    );

    return response.data;
}