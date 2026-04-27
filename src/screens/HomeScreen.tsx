import React from "react";
import { View, Text, StyleSheet} from "react-native";
import CabecalhoFixo from '../components/CabecalhoFixo';
import BotaoPadrao from "../components/BotaoPadrao";
import Background from "../components/Background";
import Carrossel from "../components/Carrossel";
import {textos} from "../utils/strings";
import { colors } from "../theme/colors";


const carrosselImagens = [
    {id: '1', source: require('../assets/SempreLimpaCarrosel1.png') },
    {id: '2', source: require('../assets/SempreLimpaCarrosel2.png') },
    {id: '3', source: require('../assets/SempreLimpaCarrosel3.png') },
]

export default function HomeScreen(){
    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}
            />
            
                <View style={styles.conteudo}>
                    <Carrossel dados={carrosselImagens} />
                    <Text style={styles.subTitulo}>
                      {textos.telaIntrodutoria.subTitulo}
                    </Text>
                    
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
                      borderColor={colors.primary}
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
  paginacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitulo: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    gap: 16
  },
  textoNormal: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    
  },
  textoNegrito: {
    marginLeft: 5,
    marginRight: 5,
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
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 40
  },
  textoRodape: {
    fontSize: 12,
    color: colors.textSecunday, 
  }
});