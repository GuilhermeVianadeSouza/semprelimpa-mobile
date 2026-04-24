import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import CabecalhoFixo from '../components/CabecalhoFixo';
import BotaoPadrao from "../components/BotaoPadrao";
import Background from "../components/Background";
import { useCarrossel } from "../hooks/carrosselIntrodutorio";
import {textos} from "../utils/strings";
import { colors } from "../theme/colors";


const carrosselImagens = [
    {id: '1', source: require('../assets/SempreLimpaCarrosel1.png') },
    {id: '2', source: require('../assets/SempreLimpaCarrosel2.png') },
    {id: '3', source: require('../assets/SempreLimpaCarrosel3.png') },
]

export default function HomeScreen(){
    const { imagemAtiva, itemVisivelMudando, viewabilityConfig} = useCarrossel()
    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}
            />

            
                <View style={styles.conteudo}>
                    <FlatList
                    data={carrosselImagens}
                    keyExtractor={(item)=> item.id}
                    horizontal = {true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10}}
                    pagingEnabled={true}

                    onViewableItemsChanged={itemVisivelMudando}
                    viewabilityConfig={viewabilityConfig}
                    renderItem={({item}) => (
                        <Image source={item.source} style={styles.imagemCarrossel}/>
                    )}
                    />
                    <View style={styles.paginacaoContainer}>
                        {carrosselImagens.map((_, index) =>(
                            <View
                            key={index}
                            style={[styles.bolinha, imagemAtiva === index && styles.bolinhaAtiva]}
                            />
                        ))}
                    </View>
                    
                            <Text style={styles.textoNormal}>
                            {textos.descricao.inicio}
                            <Text style={styles.textoNegrito}>{textos.descricao.meio}</Text>
                            {textos.descricao.fim}
                        </Text>
                    
                    <BotaoPadrao
                    title={textos.botao.entrar}
                    backgroundColor={colors.primary}
                    textColor={colors.defaultText}
                    onPress={() =>{}}/>

                    <BotaoPadrao
                    title={textos.botao.cadastrase}
                    backgroundColor="transparent"
                    textColor={colors.primary}
                    onPress={() => {}}/>
                    <View style={styles.rodape}>
                        <Text style={styles.textoRodape}>
                            {textos.telaIntrodutoria.direitos}
                        </Text>
                    </View>
                </View>

        </Background>
    )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Faz o ScrollView ocupar pelo menos a tela toda
    paddingBottom: 20, // Dá um respiro final no fim da tela
  },
  carrosselContainer: {
    marginTop: 20,
    marginBottom: 20,
    height: 170, 
  },
  imagemCarrossel: {
    width: 280, 
    height: 140, 
    borderRadius: 12, 
    marginHorizontal: 10, 
    backgroundColor: '#E0E0E0', 
  },
  paginacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  bolinha: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#C0C0C0', marginHorizontal: 4,
  },
  bolinhaAtiva: {
    width: 20, backgroundColor: colors.primary,
  },
  conteudo: {
    paddingHorizontal: 20,
    flex: 1, // Empurra o rodapé para baixo se sobrar espaço
  },
  textoNormal: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  textoNegrito: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  textoDestaque: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  rodape: {
    marginTop: 40,
    alignItems: 'center',
  },
  textoRodape: {
    fontSize: 12,
    color: colors.textSecunday, // Aquele texto menor e mais clarinho no rodapé
  }
});