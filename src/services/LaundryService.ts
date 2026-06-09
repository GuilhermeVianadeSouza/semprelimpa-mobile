import { api } from './api';

export async function listarLavanderias() {
  try {
    const response = await api.get('/lavanderia');

    return response.data.items?.lavanderia || [];

  } catch (error) {
    console.error('Erro ao buscar lavanderias:', error);
    return [];
  }
}

export async function listarLavanderiasComMedia() {
  try{
    const response = await api.get('/lavanderia/media');

    return response.data.items?.lavanderia || [];
  } catch (error) {
    console.error('Erro ao buscar lavanderias com média de avaliação:', error);
    return [];
  }
}