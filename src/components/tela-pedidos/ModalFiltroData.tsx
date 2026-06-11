import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

interface ModalFiltroDataProps {
    visible: boolean;
    dataSelecionada: string | null;

    onClose: () => void;
    onSelecionar: (valor: string | null) => void;
}

export default function ModalFiltroData({
    visible,
    dataSelecionada,
    onClose,
    onSelecionar
}: ModalFiltroDataProps) {

    const opcoes = [
        "Hoje",
        "Últimos 7 dias",
        "Últimos 30 dias",
        "Este mês"
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>

                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.titulo}>
                            Filtrar por Data
                        </Text>

                        <TouchableOpacity onPress={onClose}>
                            <MaterialCommunityIcons
                                name="close"
                                size={24}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>

                    {opcoes.map((opcao) => (
                        <TouchableOpacity
                            key={opcao}
                            style={[
                                styles.opcao,
                                dataSelecionada === opcao &&
                                    styles.opcaoSelecionada
                            ]}
                            onPress={() => {
                                onSelecionar(opcao);
                                onClose();
                            }}
                        >
                            <Text
                                style={[
                                    styles.textoOpcao,
                                    dataSelecionada === opcao &&
                                        styles.textoSelecionado
                                ]}
                            >
                                {opcao}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.limpar}
                        onPress={() => {
                            onSelecionar(null);
                            onClose();
                        }}
                    >
                        <Text style={styles.limparTexto}>
                            Limpar filtro
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },

    titulo: {
        fontSize: 18,
        fontWeight: "bold"
    },

    opcao: {
        borderWidth: 1,
        borderColor: "#EAEAEA",
        borderRadius: 10,
        padding: 14,
        marginBottom: 10
    },

    opcaoSelecionada: {
        borderColor: colors.primary,
        backgroundColor: "#E7F3FF"
    },

    textoOpcao: {
        color: "#555"
    },

    textoSelecionado: {
        color: colors.primary,
        fontWeight: "bold"
    },

    limpar: {
        marginTop: 10,
        alignItems: "center"
    },

    limparTexto: {
        color: "#FF4444",
        fontWeight: "600"
    }
});