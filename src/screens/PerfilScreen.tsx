
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import Background from "../components/common/Background";
import { colors } from "../theme/colors";
import { usePerfil } from "../hooks/usePerfil"
import HeaderPerfil from "../components/tela-perfil/HeaderPerfil";
import { useNavigation } from "@react-navigation/native";

export default function PerfilScreen() {

    const navigation = useNavigation<any>()

    const { form } = usePerfil()

    if (!form || !form.usuario) {
      return (
        <View>
          <Text>Carregando...</Text>
        </View>
      )
    }
    
  
    return (
      <Background>
        <HeaderPerfil
            onPressVoltar={() => navigation.goBack()}
            titulo="Perfil"
            onPressEditar={() => console.log('Editar')}
            />
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { flexGrow: 1}
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/avatar-placeholder.png")}
              style={styles.avatar}
            />
          </View>
  
          <Text style={styles.nome}>
            {form.usuario.nome}
          </Text>
  
          <View style={styles.informacoesContainer}>
            <Text style={styles.info}>{form.usuario.email}</Text>
            <Text style={styles.info}>{form.usuario.telefone}</Text>
            <Text style={styles.info}>{form.usuario.cpf}</Text>
            <Text style={styles.info}>{form.usuario.dataNascimento}</Text>
          </View>
  
          <Text style={styles.tituloEndereco}>
            Endereço
          </Text>
  
          <View style={styles.informacoesContainer}>
            <Text style={styles.info}>{form.usuario.cep}</Text>
            <Text style={styles.info}>{form.usuario.rua}</Text>
            <Text style={styles.info}>{form.usuario.bairro}</Text>
            <Text style={styles.info}>
              {form.usuario.estado} - {form.usuario.cidade}
            </Text>
            <Text style={styles.info}>{form.usuario.complemento}</Text>
            <Text style={styles.info}>
              Número {form.usuario.numero}
            </Text>
          </View>
        </ScrollView>
      </Background>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 32,
      paddingTop: 1,
      paddingBottom: 0,
      alignItems: "center",
    },
  
    avatarContainer: {
      width: 170,
      height: 170,
      borderRadius: 100,
      borderWidth: 6,
      borderColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      marginBottom: 25,
    },
  
    avatar: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  
    nome: {
      fontSize: 34,
      fontWeight: "700",
      color: colors.textGray,
      marginBottom: 35,
      textAlign: "center",
    },
  
    informacoesContainer: {
      width: "100%",
      marginBottom: 30,
    },
  
    info: {
      width: "100%",
      textAlign: "center",
      fontSize: 18,
      color: colors.textGray,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#C9C9C9",
      fontWeight: "500",
    },
  
    tituloEndereco: {
      fontSize: 34,
      fontWeight: "700",
      color: colors.textGray,
      marginBottom: 15,
    },
  });