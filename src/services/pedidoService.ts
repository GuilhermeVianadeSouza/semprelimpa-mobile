import api from "./api";
import { obterUsuarioLogado } from "./authService";

export async function buscarPedidos() {
    const usuario = await obterUsuarioLogado();

    const response = await api.get(
        `/pedido/`
    );

    return response.data;
}