import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";

import Background from "../components/common/Background";
import CardPedido from "../components/tela-home/CardPedido";
import IconeCesto from "../assets/cesto-icon.svg";
import HeaderPerfil from "../components/tela-perfil/HeaderPerfil";
import { useNavigation } from "@react-navigation/native";
import BarraFiltrosPedido from "../components/tela-pedidos/BarraFiltrosPedido";
import ModalFiltroData from "../components/tela-pedidos/ModalFiltroData";

import { colors } from "../theme/colors";
import { usePedidos } from "../hooks/usePedidos";

export function PedidosScreen() {
    const navigation = useNavigation();

    const {
        pedidos,
        carregando,
        erro
    } = usePedidos();
    const [valorBusca, setValorBusca] = useState("");

    const [statusAtivo, setStatusAtivo] =
        useState<string | null>(null);

    const [dataSelecionada, setDataSelecionada] =
        useState<string | null>(null);

    const [modalDataAberto, setModalDataAberto] =
        useState(false);
    function formatarNumeroPedido(id: number) {
        return `${String(id + 7).padStart(3, "0")}`;
    }

    function formatarStatus(id: number) {
        switch (id) {
            case 1:
                return "Pendente";

            case 2:
                return "Andamento";

            case 3:
                return "Finalizado";

            case 4:
                return "Cancelado";

            default:
                return "Desconhecido";
        }
    }
    const pedidosFiltrados = [...pedidos]

        // Mais recente primeiro
        .sort((a, b) => b.pedido_id - a.pedido_id)

        // Busca por número
        .filter((pedido) => {

            if (!valorBusca) return true;

            return String(pedido.pedido_id)
                .includes(valorBusca.replace("#", ""));
        })

        // Status
        .filter((pedido) => {

            if (!statusAtivo) return true;

            switch (statusAtivo) {

                case "EM_ANDAMENTO":
                    return pedido.fk_status_id === 2;

                case "FINALIZADO":
                    return pedido.fk_status_id === 3;

                case "CANCELADO":
                    return pedido.fk_status_id === 4;

                default:
                    return true;
            }
        });

    if (carregando) {
        return (
            <Background>
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />
            </Background>
        );
    }

    if (erro) {
        return (
            <Background>
                <Text>{erro}</Text>
            </Background>
        );
    }
    console.log(
        "Pedidos carregados:",
        pedidos
    );

    return (
        <Background>
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <HeaderPerfil
                    onPressVoltar={() => navigation.goBack()}
                    titulo="Pedidos"
                    mostrarEditar={false}
                />
                <BarraFiltrosPedido
                    valorBusca={valorBusca}
                    aoMudarBusca={setValorBusca}
                    statusAtivo={statusAtivo}
                    aoMudarStatus={(status) => {

                        if (statusAtivo === status) {
                            setStatusAtivo(null);
                            return;
                        }

                        setStatusAtivo(status);
                    }}
                    aoAbrirModalData={() =>
                        setModalDataAberto(true)
                    }
                    dataSelecionada={dataSelecionada}
                />
                <ModalFiltroData
                    visible={modalDataAberto}
                    dataSelecionada={dataSelecionada}
                    onClose={() =>
                        setModalDataAberto(false)
                    }
                    onSelecionar={setDataSelecionada}
                />
                {pedidosFiltrados.length > 0 ? (
                    pedidosFiltrados.map((pedido) => (
                        <CardPedido
                            key={pedido.pedido_id}
                            icon={
                                <IconeCesto
                                    width={24}
                                    height={24}
                                    fill={
                                        colors.backgroundGray
                                    }
                                />
                            }
                            numeroPedido={formatarNumeroPedido(
                                pedido.pedido_id
                            )}
                            data={new Date(
                                pedido.data
                            ).toLocaleDateString(
                                "pt-BR"
                            )}
                            quantidadeItens="Pedido"
                            status={formatarStatus(
                                pedido.fk_status_id
                            )}
                        />
                    ))
                ) : (
                    <Text style={styles.semPedidos}>
                        Você ainda não possui pedidos.
                    </Text>
                )}
            </ScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        gap: 20,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: colors.text
    },

    semPedidos: {
        marginTop: 50,
        textAlign: "center",
        color: colors.textGray
    }
});