import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importações dos seus componentes customizados (Ajuste os caminhos se necessário)
import Background from '../components/common/Background'; 
import HeaderHome from '../components/tela-home/HeaderHome';
import CardDashboard from '../components/tela-home/CardDashboard';
import BotaoPadrao from '../components/common/BotaoPadrao';
import { colors } from '../theme/colors';
import CardPedido from "../components/tela-home/CardPedido";

// Importação do ícone de adicionar (Ajuste o caminho se necessário)
import IconeAdd from '../assets/add-icon.svg'
import IconeCesto from '../assets/cesto-icon.svg'

export function HomeScreen() {
    const navigation = useNavigation<any>();

    // Funções de disparo para testar os cliques dos botões
    function lidarComNotificacao() {
        console.log("Sino de notificações pressionado!");
    }

    function lidarComDetalhesPedido() {
        console.log("Usuário quer ver detalhes do pedido atual...");
        // navigation.navigate('DetalhesPedido');
    }

    function lidarComNovoPedido() {
        console.log("Iniciando fluxo de novo pedido...");
        // navigation.navigate('CriarPedido');
    }

    return (
        <Background>
            {/* 1. TOPO DO APLICATIVO */}
            <HeaderHome 
                nomeUsuario="Guilherme" 
                urlFotoPerfil="" // Deixe vazio para testar a imagem padrão circular
                onPressNotificacao={lidarComNotificacao}
            />

            {/* Usamos o ScrollView para garantir que o conteúdo role perfeitamente em telas menores */}
            <ScrollView 
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteudoEspacamento}
            >
                
                {/* 2. CARD DO DASHBOARD (O Camaleão: Gota vs Folha) */}
                {/* Passamos dados mocados idênticos ao figma para validar a estrutura visual */}
                <CardDashboard 
                    // Dados do Pedido Atual (Aba Gota)
                    numeroPedido="10492"
                    statusTexto="Em processamento"
                    progresso={50} // Teste mudar para 20 ou 95 para ver a máquina mudar de cor!
                    mensagem="Sua roupa está a secar."
                    onVerDetalhes={lidarComDetalhesPedido}
                    
                    // Dados de Impacto (Aba Folha)
                    cestosLavados={2}
                    reaisEconomizadosTotais="32,50"
                    economiaAguaVolume="45 Litros"
                    economiaAguaReais="R$ 4,50"
                    economiaEnergiaKw="2.1 kWh"
                    economiaEnergiaReais="R$ 2,00"
                    economiaInsumosReais="R$ 8,00"
                    tempoPoupado="3h 30m"
                />

                {/* 3. ÁREA DE SEÇÃO OU ELEMENTOS EXTRAS */}
                {/* Criamos um pequeno bloco visual para simular o restante da tela inicial */}
                <View style={styles.secaoAcoes}>
                    
                    <View style={styles.espacadorBotao}>
                        <BotaoPadrao
                            icon={<IconeAdd width={20} height={20} fill="#FFFFFF" />}
                            title="Solicitar Nova Lavagem"
                            onPress={lidarComNovoPedido}
                            backgroundColor={colors.primary || colors.iconAndTextSelectColor}
                            style={{height: 60}}
                        />
                    </View>
                </View>
                <View style={styles.ultimosPedidosContainer}>
                    <View style={styles.tituloSecaoContainer}>
                        <Text style={styles.ultimosPedidos}>
                            Últimos Pedidos
                        </Text>
                        <Text style={styles.verTodos}>
                            Ver todos
                        </Text>
                    </View>
                    <View style={styles.ultimosPedidosLista}>
                        <CardPedido
                        icon={<IconeCesto width={24} height={24} fill={colors.backgroundGray}/>}
                            numeroPedido="10491"
                            data="20/09/2024"
                            quantidadeItens="3 itens"
                            status="Entregue"
                        />
                          <CardPedido
                        icon={<IconeCesto width={24} height={24} fill={colors.backgroundGray}/>}
                            numeroPedido="10491"
                            data="20/09/2024"
                            quantidadeItens="3 itens"
                            status="Entregue"
                        />
                        <Text style={styles.nenhumPedido}>
                            Você ainda não fez nenhum pedido...
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        marginTop: 15,
    },
    conteudoEspacamento: {
        paddingBottom: 30, // Garante que o conteúdo não fique escondido atrás do menu de abas inferior
    },
    secaoAcoes: {
        width: '100%',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Um fundo branco bem transparente para dar contraste no degradê
        borderRadius: 16,
        padding: 0,
    },
    tituloSecao: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 15,
    },
    espacadorBotao: {
        width: '100%'
    },
    ultimosPedidosContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10
    },
    tituloSecaoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    ultimosPedidos: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    verTodos: {
        fontSize: 14,
        color: colors.textGray || colors.iconAndTextSelectColor,
    },
    ultimosPedidosLista: {
        width: '100%',
        marginTop: 10,
        gap: 20
},
    nenhumPedido: {
        fontSize: 14,
        color: colors.textGray,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 100,
    }
});