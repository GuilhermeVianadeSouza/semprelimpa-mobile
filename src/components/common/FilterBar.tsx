import React from 'react'
import {
  ScrollView
} from 'react-native'

import FilterChip from './FilterChip'

interface Props {
  filtrosAtivos: string[]
  aoClicarFiltro: (nome: string) => void
}

export default function FilterBar({
  filtrosAtivos,
  aoClicarFiltro
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <FilterChip
        titulo="Preço"
        ativo={filtrosAtivos.includes('preco')}
        onPress={() =>
          aoClicarFiltro('preco')
        }
      />

      <FilterChip
        titulo="Avaliação"
        ativo={filtrosAtivos.includes('avaliacao')}
        onPress={() =>
          aoClicarFiltro('avaliacao')
        }
      />

      <FilterChip
        titulo="Distância"
        ativo={filtrosAtivos.includes('distancia')}
        onPress={() =>
          aoClicarFiltro('distancia')
        }
      />

      <FilterChip
        titulo="Favoritos"
        ativo={filtrosAtivos.includes('favoritos')}
        onPress={() =>
          aoClicarFiltro('favoritos')
        }
      />
    </ScrollView>
  )
}