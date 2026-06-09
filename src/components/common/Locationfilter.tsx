import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

interface Props {
  bairroAtual?: string
  cidadeAtual?: string
  aoSelecionar: (
    bairro: string,
    cidade: string
  ) => void
  aoCancelar: () => void
}

export default function LocationFilter({
  bairroAtual = '',
  cidadeAtual = '',
  aoSelecionar,
  aoCancelar
}: Props) {

  const [bairro, setBairro] = useState(bairroAtual)
  const [cidade, setCidade] = useState(cidadeAtual)

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Filtrar por localização
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />

      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <View style={styles.botoes}>

        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={aoCancelar}
        >
          <Text style={styles.textoBotao}>
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoAplicar}
          onPress={() =>
            aoSelecionar(
              bairro.trim(),
              cidade.trim()
            )
          }
        >
          <Text style={styles.textoBotao}>
            Aplicar
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 3
  },

  titulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  botaoCancelar: {
    flex: 1,
    backgroundColor: '#999',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  botaoAplicar: {
    flex: 1,
    backgroundColor: '#3BA1F2',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: '600'
  }
})