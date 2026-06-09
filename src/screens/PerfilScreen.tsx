import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity
} from "react-native";

import React, { useEffect, useState } from "react";
import Background from "../components/common/Background";
import { colors } from "../theme/colors";
import { usePerfil } from "../hooks/usePerfil";
import HeaderPerfil from "../components/tela-perfil/HeaderPerfil";
import { useNavigation } from "@react-navigation/native";
import BotaoPadrao from "../components/common/BotaoPadrao";
import { efetuarLogout } from "../services/authService";
import { atualizarPerfilUsuario } from "../services/authService";
import { atualizarEndereco } from "../services/authService";
import { useAuth } from "../routes/AuthContext";

import {
  validarEmail,
  validarMaiorIdade,
  validarTelefone
} from "../utils/validacoes";

import { buscarCepViaCep } from "../services/viaCepService";

export default function PerfilScreen() {
  const { logout } = useAuth();

  const navigation = useNavigation<any>()

  const [modoEdicao, setModoEdicao] = useState(false)

  const { form } = usePerfil()

  const [mensagemErro, setMensagemErro] = useState('')

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')

  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const [cep, setCep] = useState('')
  const [complemento, setComplemento] = useState('')
  const [numero, setNumero] = useState('')

  useEffect(() => {

    if (form.usuario) {

      setNome(form.usuario.nome)
      setEmail(form.usuario.email)
      setTelefone(form.usuario.telefone)
      setDataNascimento(form.usuario.dataNascimento)

      setRua(form.usuario.rua)
      setBairro(form.usuario.bairro)
      setCidade(form.usuario.cidade)
      setEstado(form.usuario.estado)

      setCep(form.usuario.cep)
      setComplemento(form.usuario.complemento)
      setNumero(form.usuario.numero)
    }

  }, [form.usuario])

  if (!form || !form.usuario) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    )
  }

  const buscarCep = async (cepDigitado: string) => {

    const cepLimpo = cepDigitado.replace(/\D/g, '')

    setCep(cepLimpo.slice(0, 8))

    if (cepLimpo.length !== 8) {
      return
    }

    try {

      const endereco: any = await buscarCepViaCep(cepLimpo)

      setRua(endereco.logradouro || '')
      setBairro(endereco.bairro || '')
      setCidade(endereco.localidade || '')
      setEstado(endereco.uf || '')

      setMensagemErro('')

    } catch (error) {

      setRua('')
      setBairro('')
      setCidade('')
      setEstado('')

      setMensagemErro('CEP não encontrado')
    }
  }

  return (
    <Background>

      <HeaderPerfil
        onPressVoltar={() => navigation.goBack()}
        titulo="Perfil"
        onPressEditar={() => {

          setModoEdicao(!modoEdicao)

          setNome(form.usuario.nome)
          setEmail(form.usuario.email)
          setTelefone(form.usuario.telefone)
          setDataNascimento(form.usuario.dataNascimento)

          setRua(form.usuario.rua)
          setBairro(form.usuario.bairro)
          setCidade(form.usuario.cidade)
          setEstado(form.usuario.estado)

          setCep(form.usuario.cep)
          setComplemento(form.usuario.complemento)
          setNumero(form.usuario.numero)
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { flexGrow: 1 }
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

        {
          modoEdicao ? (
            <TextInput
              style={styles.inputNome}
              value={nome}
              onChangeText={setNome}
            />
          ) : (
            <Text style={styles.nome}>
              {nome}
            </Text>
          )
        }

        <View style={styles.informacoesContainer}>

          {
            modoEdicao ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            ) : (
              <Text style={styles.info}>
                {email}
              </Text>
            )
          }

          {
            modoEdicao ? (
              <TextInput
                style={styles.input}
                value={telefone}
                keyboardType="numeric"
                maxLength={11}
                onChangeText={(texto) => {

                  const somenteNumeros = texto.replace(/\D/g, '')

                  setTelefone(somenteNumeros)
                }}
              />
            ) : (
              <Text style={styles.info}>
                {telefone}
              </Text>
            )
          }

          <Text style={styles.info}>
            {form.usuario.cpf}
          </Text>

          {
            modoEdicao ? (
              <TextInput
                style={styles.input}
                value={dataNascimento}
                keyboardType="numeric"
                maxLength={8}
                placeholder="DDMMAAAA"
                onChangeText={(texto) => {

                  const somenteNumeros = texto.replace(/\D/g, '')

                  setDataNascimento(somenteNumeros.slice(0, 8))
                }}
              />
            ) : (
              <Text style={styles.info}>
                {dataNascimento}
              </Text>
            )
          }

        </View>

        <Text style={styles.tituloEndereco}>
          Endereço
        </Text>

        <View style={styles.informacoesContainer}>

          {
            modoEdicao ? (
              <TextInput
                style={styles.input}
                value={cep}
                keyboardType="numeric"
                maxLength={8}
                placeholder="Digite o CEP"
                onChangeText={buscarCep}
              />
            ) : (
              <Text style={styles.info}>
                {cep}
              </Text>
            )
          }

          <Text style={styles.info}>
            {rua}
          </Text>

          <Text style={styles.info}>
            {bairro}
          </Text>

          <Text style={styles.info}>
            {estado} - {cidade}
          </Text>

          {
            modoEdicao ? (
              <TextInput
                style={styles.input}
                value={complemento}
                onChangeText={setComplemento}
                placeholder="Complemento"
              />
            ) : (
              <Text style={styles.info}>
                {complemento}
              </Text>
            )
          }

          {
            modoEdicao ? (
              <TextInput
                style={styles.input}
                value={numero}
                placeholder="Número"
                keyboardType="numeric"
                maxLength={6}
                onChangeText={(texto) => {

                  const somenteNumeros = texto.replace(/\D/g, '')

                  setNumero(somenteNumeros)
                }}
              />
            ) : (
              <Text style={styles.info}>
                Número {numero}
              </Text>
            )
          }

        </View>

        {!modoEdicao && (
          <View style={styles.botaoLogout}>
            <BotaoPadrao
              title="LogOut"
              onPress={async() => {
                try {
                  await logout();
                } catch (error) {
                  console.error("Erro ao efetuar logout", error)
                }
              }}
              style={{ borderColor: 'transparent', width: 200, height: 55 }}
              icon={
                <Image
                  source={require("../assets/log-out.png")}
                  style={{ width: 24, height: 24, tintColor: '#fff' }}
                />
              }
            />
          </View>
        )}
      </ScrollView>

      {
        modoEdicao && (

          <View style={styles.botoes}>

            {
              mensagemErro ? (
                <Text style={styles.erro}>
                  {mensagemErro}
                </Text>
              ) : null
            }
            <View style={{}}>
              <BotaoPadrao
                title="Salvar Alterações"
                onPress={async () => {

                  setMensagemErro("")

                  if (!validarEmail(email)) {
                    setMensagemErro("E-mail inválido")
                    return
                  }

                  if (!validarTelefone(telefone)) {
                    setMensagemErro("Telefone inválido")
                    return
                  }

                  if (!validarMaiorIdade(dataNascimento)) {
                    setMensagemErro("É necessário ser maior de idade")
                    return
                  }

                  try {

                    const [dia, mes, ano] = dataNascimento.split('/')

                    const dataFormatada = `${ano}-${mes}-${dia}`

                    // Atualiza usuário
                    await atualizarPerfilUsuario({
                      nome,
                      e_mail: email,
                      telefone,
                      cpf: form.usuario.cpf,
                      data_nascimento: dataFormatada
                    })
                    console.log(form.usuario)
                    // Atualiza endereço
                    await atualizarEndereco(
                      form.usuario.idEndereco,
                      {
                      cep,
                      logradouro: rua,
                      bairro,
                      uf: estado,
                      cidade,
                      complemento,
                      numero
                    })

                    setModoEdicao(false)

                  } catch (error: any) {

                    setMensagemErro(
                      error.message || "Erro ao atualizar perfil"
                    )

                    console.error(error)
                  }
                }}

                style={{ width: 200, height: 55 }}
              />
            </View>

          </View>
        )
      }

    </Background>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
  },

  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },

  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  nome: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textGray,
    marginBottom: 20,
    textAlign: "center",
  },

  informacoesContainer: {
    width: "100%",
    marginBottom: 15,
  },

  info: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    color: colors.textGray,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#C9C9C9",
    fontWeight: "500",
  },

  tituloEndereco: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textGray,
    marginBottom: 10,
  },

  input: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: colors.textGray,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    fontWeight: '500',
  },

  inputNome: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textGray,
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    width: '100%',
  },

  botoes: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  erro: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "600"
  },
  botaoLogout: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 200,
    height: 55,
    marginBottom: 5
  },

  textoLogout: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});