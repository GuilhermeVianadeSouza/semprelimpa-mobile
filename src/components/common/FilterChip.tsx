import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

interface Props {
  titulo: string
  ativo: boolean
  onPress: () => void
}

export default function FilterChip({
  titulo,
  ativo,
  onPress
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        ativo && styles.chipAtivo
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.texto,
          ativo && styles.textoAtivo
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 10
  },

  chipAtivo: {
    backgroundColor: '#3BA1F2',
    borderColor: '#3BA1F2'
  },

  texto: {
    color: '#666'
  },

  textoAtivo: {
    color: '#FFF'
  }
})