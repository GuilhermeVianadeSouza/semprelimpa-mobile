import React from 'react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  value: string
  onChangeText: (text: string) => void
}

export default function SearchBar({
  value,
  onChangeText
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify"
        size={24}
      />

      <TextInput
        style={styles.input}
        placeholder="Buscar lavanderia..."
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 15
  },

  input: {
    flex: 1,
    marginLeft: 10
  }
})