import React from 'react';
import CabecalhoFixo from '../components/common/CabecalhoFixo';
import Background from '../components/common/Background';
import BotaoPadrao from '../components/common/BotaoPadrao';
import InputMascarado from '../components/common/inputMascarado';
import { textos } from '../utils/strings';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAutenticacao from '../components/tela-login/cadastre-se/CardAutenticacao';
import { useCadastro } from '../hooks/useCadastro';

export default function CadastroScreen() {
    const navigation = useNavigation<any>()

    const {form, acoes} = useCadastro()

    const lidarComBotaoVoltar = () => {
        if(form.etapaAtual === 1) {
            navigation.goBack()
        } else {
            acoes.voltarEtapa()
        }
    }
    const renderizarEtapaAtual = () => {
        switch (form.etapaAtual) {
            case 1:
                return (
                    <View style={styles.etapaContainer}>

                        <InputMascarado label={textos.input.nome} tipo='texto' valor={form.nome} aoMudarTexto={(texto) =>form.setNome(texto)}/>
                        <InputMascarado label={textos.input.Email} tipo='e_mail' valor={form.email} aoMudarTexto={(texto) => form.setEmail(texto)}/>
                        <InputMascarado label={textos.input.telefone} tipo='telefone' valor={form.telefone} aoMudarTexto = {(texto) => form.setTelefone(texto)}/>
                        <InputMascarado label={textos.input.dataNascimento} tipo="data" valor={form.dataNascimento} aoMudarTexto={(data) => form.setDataNascimento(data)}/>
                        <InputMascarado label={textos.input.cpf} tipo="cpf" valor={form.cpf} aoMudarTexto={(cpf) => form.setCpf(cpf)}/>
                        
                    </View>
                )
            case 2:
                return (
                    <View style={styles.etapaContainer}>
                        
                        <InputMascarado label="CEP" tipo="cep" valor={form.cep} aoMudarTexto={() => {}} />
                        
                        {/* Bairro e Rua ficam soltos, ocupando a linha toda */}
                        <InputMascarado label="Rua" tipo="texto" valor={form.rua} aoMudarTexto={() => {}} editavel={form.rua === ''} />
                        <InputMascarado label="Bairro" tipo="texto" valor={form.bairro} aoMudarTexto={() => {}} editavel={form.bairro === ''} />
                        
                        {/* Cidade e UF lado a lado */}
                        <View style={styles.linhaDupla}>
                            <InputMascarado 
                                label="Cidade" 
                                tipo="texto" 
                                valor={form.cidade} 
                                aoMudarTexto={() => {}} 
                                containerStyle={{ flex: 1 }} 
                                editavel={form.cidade === ''} 
                            />
                            <InputMascarado 
                                label="UF" 
                                tipo="texto" 
                                valor={form.estado} 
                                aoMudarTexto={() => {}} 
                                containerStyle={{ flex: 1 }} 
                                editavel={form.estado === ''} 
                            />
                        </View>

                        {/* Número e Complemento lado a lado (Fica com um visual muito profissional) */}
                        <View style={styles.linhaDupla}>
                            <InputMascarado 
                                label="Número" 
                                tipo="texto" // Lembrando: texto para permitir "S/N" ou "102-B"
                                valor={form.numero} 
                                aoMudarTexto={() => {}} 
                                containerStyle={{ flex: 0.4 }} // O número é menorzinho, ocupa 40% da tela
                            />
                            <InputMascarado 
                                label="Complemento" 
                                placeholder="Apto, Bloco (Opcional)"
                                tipo="texto" 
                                valor={form.complemento} 
                                aoMudarTexto={() => {}} 
                                containerStyle={{ flex: 1 }} // O complemento ocupa o resto do espaço
                            />
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View style={styles.etapaContainer}>
                        
                        <InputMascarado 
                            label="Crie uma Senha" 
                            placeholder="Minímo 6 caracteres"
                            tipo="senha" 
                            valor={form.senha} 
                            aoMudarTexto={(mascarado, puro) => console.log('Senha:', puro)} 
                        />
                        
                    
                        <Text style={styles.labelImagem}>Foto de Perfil (Opcional)</Text>
                        <TouchableOpacity style={styles.botaoUploadImagem} activeOpacity={0.7}>
                            <Text style={styles.textoUpload}>Toque para escolher uma foto</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                
                return null;
            }
        }

    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}/>

            <CardAutenticacao
            titulo= {textos.cardAuten.cadastra}
            onBack={lidarComBotaoVoltar}>
                <ScrollView 
                    style={styles.scroll} 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {renderizarEtapaAtual()}
                </ScrollView>
                    <BotaoPadrao
                        title={form.etapaAtual === 3 ? textos.botao.finalizar : textos.botao.continuar}
                        onPress={form.etapaAtual === 3 ? acoes.finalizarCadastro : acoes.avancarEtapa}
                        
                    >
                    </BotaoPadrao>
            </CardAutenticacao>
        </Background>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
        elevation: 2, // Sombra suave no Android
        shadowColor: '#000', // Sombra suave no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    botaoVoltar: {
        paddingRight: 15,
    },
    headerTextos: {
        flex: 1,
    },
    tituloHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    subtituloHeader: {
        fontSize: 14,
        color: '#007AFF', // Cor de destaque sutil
        fontWeight: '500'
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40, // Espaço extra no final da rolagem
    },
    etapaContainer: {
        flex: 1,
    },
    tituloEtapa: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 25,
    },
    linhaDupla: {
        flexDirection: 'row',
        gap: 15, 
    },
    labelImagem: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 10
    },
    botaoUploadImagem: {
        width: '100%',
        height: 160,
        backgroundColor: '#f1f3f5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#ced4da'
    },
    textoUpload: {
        marginTop: 12,
        color: '#6c757d',
        fontWeight: '500',
        fontSize: 14
    },
    rodape: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
    },
    botaoAcao: {
        backgroundColor: '#007AFF', // Azul padrão
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoFinalizar: {
        backgroundColor: '#28a745', // Verde para transmitir conclusão na última etapa
    },
    textoBotaoAcao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5
    }
});