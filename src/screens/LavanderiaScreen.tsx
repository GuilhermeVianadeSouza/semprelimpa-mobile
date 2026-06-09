import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLavanderias } from "../hooks/useLavanderia";

export default function LavanderiasScreen() {
    const { lavanderias, loading } = useLavanderias();

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={30}
                        color="#4A5568"
                    />
                </TouchableOpacity>

                <Text style={styles.titulo}>
                    Lavanderias
                </Text>

                <View style={{ width: 30 }} />
            </View>

            {/* FILTROS */}
            <View style={styles.filtrosContainer}>
                <TouchableOpacity style={styles.filtroAtivo}>
                    <Text style={styles.textoFiltroAtivo}>Preço</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filtro}>
                    <Text style={styles.textoFiltro}>Distância</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filtro}>
                    <Text style={styles.textoFiltro}>Avaliação</Text>
                </TouchableOpacity>
            </View>

            {/* LISTA */}
            <FlatList
                data={lavanderias}
                keyExtractor={(item) => item.lavanderia_id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}

                ListEmptyComponent={
                    loading ? (
                        <Text>Carregando lavanderias...</Text>
                    ) : (
                        <Text>Nenhuma lavanderia encontrada</Text>
                    )
                }

                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>

                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                            }}
                            style={styles.logo}
                        />

                        <View style={styles.infoContainer}>

                            <Text style={styles.nome}>
                                {item.nome || "Lavanderia"}
                            </Text>

                            <View style={styles.avaliacaoContainer}>
                                <MaterialCommunityIcons
                                    name="star"
                                    color="#F59E0B"
                                    size={16}
                                />

                                <Text style={styles.avaliacao}>
                                    {Number(item.media_avaliacao || 0).toFixed(1)}
                                </Text>
                            </View>

                            <Text style={styles.endereco}>
                                {item.bairro || "Bairro"}, {item.cidade || "Cidade"}
                            </Text>

                        </View>

                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name="heart-outline"
                                size={26}
                                color="#64748B"
                            />
                        </TouchableOpacity>

                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#EEF4FA",
        paddingHorizontal: 16,
        paddingTop: 50
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },

    titulo: {
        fontSize: 34,
        fontWeight: "700",
        color: "#4A5568"
    },

    filtrosContainer: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10
    },

    filtroAtivo: {
        backgroundColor: "#3BA1F2",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20
    },

    textoFiltroAtivo: {
        color: "#FFF",
        fontWeight: "600"
    },

    filtro: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20
    },

    textoFiltro: {
        color: "#64748B",
        fontWeight: "600"
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2
    },

    logo: {
        width: 70,
        height: 70,
        borderRadius: 12
    },

    infoContainer: {
        flex: 1,
        marginLeft: 15
    },

    nome: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222"
    },

    avaliacaoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4
    },

    avaliacao: {
        marginLeft: 4,
        color: "#444",
        fontWeight: "600"
    },

    endereco: {
        color: "#666",
        fontSize: 13
    }
});