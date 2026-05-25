import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors'; // Ajuste o caminho

interface CardDashboardProps {
    // Dados da Gota (Pedido)
    numeroPedido: string;
    statusTexto: string;
    progresso: number; // de 0 a 100
    mensagem: string;
    onVerDetalhes: () => void;
    
    // Dados da Folha (Economia)
    cestosLavados: number;
    reaisEconomizados: string;
    economiaAgua: string;
    economiaEnergia: string;
    economiaInsumos: string;
    tempoPoupado: string;
}

export default function CardDashboard({
    numeroPedido,
    statusTexto,
    progresso,
    mensagem,
    onVerDetalhes,
    cestosLavados,
    reaisEconomizados,
    economiaAgua,
    economiaEnergia,
    economiaInsumos,
    tempoPoupado
}: CardDashboardProps) {
    
    // Estado que controla qual aba está ativa ('gota' ou 'folha')
    const [abaAtiva, setAbaAtiva] = useState<'gota' | 'folha'>('gota');

    // Função que muda a cor da máquina baseada na %
    const getCorMaquina = (valor: number) => {
        if (valor < 40) return '#FF4C4C'; // Vermelho (início)
        if (valor < 80) return '#FFA500'; // Laranja (metade)
        return '#28A745'; // Verde (quase/pronto)
    };

    return (
        <View style={styles.cardContainer}>
            
            {/* CABEÇALHO DO CARD (Título e os 2 Botões de Toggle) */}
            <View style={styles.header}>
                <Text style={styles.tituloHeader}>
                    {abaAtiva === 'gota' ? 'Status Atual' : 'Impacto Sustentável'}
                </Text>
                
                <View style={styles.toggleContainer}>
                    <TouchableOpacity onPress={() => setAbaAtiva('gota')} style={styles.iconBtn}>
                        <MaterialCommunityIcons 
                            name="water-outline" 
                            size={24} 
                            color={abaAtiva === 'gota' ? colors.primary || '#0056b3' : '#CCC'} 
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setAbaAtiva('folha')} style={styles.iconBtn}>
                        <MaterialCommunityIcons 
                            name="leaf" 
                            size={24} 
                            color={abaAtiva === 'folha' ? '#28A745' : '#CCC'} 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* LINHA DIVISÓRIA */}
            <View style={styles.linhaDivisoria} />

            {/* ========================================== */}
            {/* RENDERIZAÇÃO DA ABA GOTA (STATUS DO PEDIDO)*/}
            {/* ========================================== */}
            {abaAtiva === 'gota' && (
                <View style={styles.conteudo}>
                    
                    <View style={styles.linhaStatus}>
                        <View>
                            <Text style={styles.numeroPedido}>#{numeroPedido}</Text>
                            <Text style={styles.statusTexto}>{statusTexto}</Text>
                        </View>
                        <MaterialCommunityIcons 
                            name="washing-machine" 
                            size={36} 
                            color={getCorMaquina(progresso)} 
                        />
                    </View>

                    <View style={styles.linhaProgressoTxt}>
                        <Text style={styles.textoProgresso}>Progresso da lavagem</Text>
                        <Text style={styles.textoPorcentagem}>{progresso}%</Text>
                    </View>

                    {/* A BARRA DE PROGRESSO MÁGICA */}
                    <View style={styles.barraFundo}>
                        <View style={[styles.barraPreenchida, { width: `${progresso}%`, backgroundColor: getCorMaquina(progresso) }]} />
                    </View>

                    <View style={styles.linhaRodapeGota}>
                        <Text style={styles.mensagemGota}>{mensagem}</Text>
                        <TouchableOpacity onPress={onVerDetalhes}>
                            <Text style={styles.linkDetalhes}>Ver detalhes</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}

            {/* ========================================== */}
            {/* RENDERIZAÇÃO DA ABA FOLHA (ECONOMIA)       */}
            {/* ========================================== */}
            {abaAtiva === 'folha' && (
                <View style={styles.conteudo}>
                    
                    <Text style={styles.textoBaseado}>
                        Baseado em {cestosLavados} cestos lavados
                    </Text>

                    <Text style={styles.textoDinheiro}>
                        R$ {reaisEconomizados} <Text style={styles.textoDinheiroSub}>economizados</Text>
                    </Text>

                    <View style={styles.gridEconomia}>
                        {/* Água */}
                        <View style={styles.itemEconomia}>
                            <MaterialCommunityIcons name="water" size={20} color="#00A2E8" />
                            <Text style={styles.valorEconomia}>{economiaAgua}</Text>
                            <Text style={styles.labelEconomia}>Água/Esgoto</Text>
                        </View>

                        {/* Energia */}
                        <View style={styles.itemEconomia}>
                            <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFD700" />
                            <Text style={styles.valorEconomia}>{economiaEnergia}</Text>
                            <Text style={styles.labelEconomia}>Energia</Text>
                        </View>

                        {/* Insumos */}
                        <View style={styles.itemEconomia}>
                            <MaterialCommunityIcons name="molecule" size={20} color="#FF69B4" />
                            <Text style={styles.valorEconomia}>{economiaInsumos}</Text>
                            <Text style={styles.labelEconomia}>Insumos</Text>
                        </View>

                        {/* Tempo (Destaque) */}
                        <View style={styles.itemEconomia}>
                            <MaterialCommunityIcons name="clock-outline" size={20} color="#28A745" />
                            <Text style={[styles.valorEconomia, { color: '#28A745' }]}>{tempoPoupado}</Text>
                            <Text style={styles.labelEconomia}>Horas Livres</Text>
                        </View>
                    </View>

                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        width: '100%',
        elevation: 5, // Sombra Android
        shadowColor: '#000', // Sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tituloHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    toggleContainer: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: 15,
    },
    linhaDivisoria: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 12,
    },
    conteudo: {
        width: '100%',
    },
    // --- ESTILOS DA GOTA ---
    linhaStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    numeroPedido: {
        fontSize: 14,
        color: '#888',
    },
    statusTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    linhaProgressoTxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    textoProgresso: {
        fontSize: 12,
        color: '#666',
    },
    textoPorcentagem: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    barraFundo: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden', // Faz a barra de dentro não vazar pelas bordas arredondadas
        marginBottom: 15,
    },
    barraPreenchida: {
        height: '100%',
        borderRadius: 4,
    },
    linhaRodapeGota: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mensagemGota: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    linkDetalhes: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary || '#0056b3',
    },
    // --- ESTILOS DA FOLHA ---
    textoBaseado: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    textoDinheiro: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#28A745',
        marginBottom: 15,
    },
    textoDinheiroSub: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
    },
    gridEconomia: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Permite que os itens quebrem a linha se não couberem
    },
    itemEconomia: {
        alignItems: 'center',
        width: '23%', // Quase 1/4 do espaço para cada ícone
    },
    valorEconomia: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
    },
    labelEconomia: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
    }
});