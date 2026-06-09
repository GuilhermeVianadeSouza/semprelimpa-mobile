import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  id: number
  nome: string
  bairro: string
  cidade: string
  avaliacao: number
  isFavorito: boolean
  onAlternarFavorito: (id: number) => void
  onSelecionar: (id: number) => void
}

export default function LaundryCard({
  id,
  nome,
  bairro,
  cidade,
  avaliacao,
  isFavorito,
  onAlternarFavorito,
  onSelecionar
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelecionar(id)}
    >
      <View style={styles.info}>
        <Text style={styles.nome}>
          {nome}
        </Text>

        <View style={styles.linha}>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
          />

          <Text style={styles.localizacao}>
            {bairro}, {cidade}
          </Text>
        </View>

        <View style={styles.linha}>
          <MaterialCommunityIcons
            name="star"
            size={18}
            color="#FFC107"
          />

          <Text style={styles.avaliacao}>
            {avaliacao.toFixed(1)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          onAlternarFavorito(id)
        }
      >
        <MaterialCommunityIcons
          name={
            isFavorito
              ? 'heart'
              : 'heart-outline'
          }
          size={28}
          color={
            isFavorito
              ? '#FF4D4F'
              : '#CCC'
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 4
  },

  info: {
    flex: 1
  },

  nome: {
    fontSize: 18,
    fontWeight: '700'
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },

  localizacao: {
    marginLeft: 5,
    color: '#777'
  },

  avaliacao: {
    marginLeft: 5,
    fontWeight: '600'
  }
})