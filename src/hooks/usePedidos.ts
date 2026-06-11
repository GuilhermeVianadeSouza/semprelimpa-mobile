import { useEffect, useState } from "react";
import { buscarPedidos } from "../services/pedidoService";

export function usePedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarPedidos() {
        try {
            setCarregando(true);

            const response = await buscarPedidos();

            setPedidos(
                response?.items?.Pedido || []
            );

        } catch (error: any) {

            setErro(
                error.message ||
                "Erro ao carregar pedidos"
            );

        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarPedidos();
    }, []);

    return {
        pedidos,
        carregando,
        erro,
        recarregar: carregarPedidos
    };
}