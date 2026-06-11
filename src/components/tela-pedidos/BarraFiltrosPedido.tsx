import React from "react";

import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

interface BarraFiltrosPedidoProps {
    valorBusca: string;

    aoMudarBusca: (valor: string) => void;

    statusAtivo: string | null;

    aoMudarStatus: (status: string) => void;

    aoAbrirModalData: () => void;

    dataSelecionada: string | null;
}

export default function BarraFiltrosPedido({
    valorBusca,
    aoMudarBusca,
    statusAtivo,
    aoMudarStatus,
    aoAbrirModalData,
    dataSelecionada
}: BarraFiltrosPedidoProps) {

    function estiloBotao(status: string) {
        return [
            styles.botaoFiltro,
            statusAtivo === status &&
                styles.botaoFiltroAtivo
        ];
    }

    function estiloTexto(status: string) {
        return [
            styles.textoFiltro,
            statusAtivo === status &&
                styles.textoFiltroAtivo
        ];
    }

    return (
        <View style={styles.container}>

            {/* Busca */}

            <View style={styles.buscaContainer}>

                <MaterialCommunityIcons
                    name="magnify"
                    size={22}
                    color="#999"
                />

                <TextInput
                    placeholder="Buscar pedido..."
                    value={valorBusca}
                    onChangeText={aoMudarBusca}
                    style={styles.input}
                />

            </View>

            {/* Filtros */}

            <View style={styles.filtrosContainer}>

                <TouchableOpacity
                    style={estiloBotao("EM_ANDAMENTO")}
                    onPress={() =>
                        aoMudarStatus("EM_ANDAMENTO")
                    }
                >
                    <Text style={estiloTexto("EM_ANDAMENTO")}>
                        Em andamento
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={estiloBotao("FINALIZADO")}
                    onPress={() =>
                        aoMudarStatus("FINALIZADO")
                    }
                >
                    <Text style={estiloTexto("FINALIZADO")}>
                        Entregue
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={estiloBotao("CANCELADO")}
                    onPress={() =>
                        aoMudarStatus("CANCELADO")
                    }
                >
                    <Text style={estiloTexto("CANCELADO")}>
                        Cancelado
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.botaoData,
                        dataSelecionada &&
                            styles.botaoDataAtivo
                    ]}
                    onPress={aoAbrirModalData}
                >
                    <MaterialCommunityIcons
                        name="calendar"
                        size={18}
                        color={
                            dataSelecionada
                                ? "#FFF"
                                : "#666"
                        }
                    />

                    <Text
                        style={[
                            styles.textoData,
                            dataSelecionada &&
                                styles.textoDataAtivo
                        ]}
                    >
                        {dataSelecionada || "Data"}
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        gap: 12,
        display: "flex",
        width: "100%",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20
    },

    buscaContainer: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFF",

        borderRadius: 12,

        paddingHorizontal: 12,
        height: 50
    },

    input: {
        flex: 1,
        marginLeft: 10
    },

    filtrosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },

    botaoFiltro: {
        backgroundColor: "#F5F5F5",

        paddingHorizontal: 16,
        paddingVertical: 8,

        borderRadius: 20
    },

    botaoFiltroAtivo: {
        backgroundColor: "#E1F0FC",
        borderWidth: 1,
        borderColor: colors.primary
    },

    textoFiltro: {
        color: "#666"
    },

    textoFiltroAtivo: {
        color: colors.primary,
        fontWeight: "bold"
    },

    botaoData: {
        flexDirection: "row",
        alignItems: "center",

        gap: 6,

        borderWidth: 1,
        borderColor: "#DDD",

        paddingHorizontal: 16,
        paddingVertical: 8,

        borderRadius: 20
    },

    botaoDataAtivo: {
        backgroundColor: colors.primary,
        borderColor: colors.primary
    },

    textoData: {
        color: "#666"
    },

    textoDataAtivo: {
        color: "#FFF"
    }
});