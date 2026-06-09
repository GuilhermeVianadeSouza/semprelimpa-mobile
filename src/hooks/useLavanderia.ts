import { useEffect, useState } from 'react';
import { listarLavanderias } from '../services/LaundryService';
import { listarLavanderiasComMedia } from '../services/LaundryService';

export interface Lavanderia {
  lavanderia_id: number;
  nome: string;
  logo?: string;
  preco_padrao_lavagem: number;
  bairro?: string;
  cidade?: string;
  media_avaliacao?: number;
}

export function useLavanderias() {

  const [lavanderias, setLavanderias] = useState<Lavanderia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const data = await listarLavanderiasComMedia();
    setLavanderias(data);
    setLoading(true);

    try {
      const response = await listarLavanderias();

      const lista = response?.items?.lavanderia || response || [];

      setLavanderias(lista);

    } catch (error) {
      console.log("Erro ao carregar lavanderias:", error);
      setLavanderias([]);
    } finally {
      setLoading(false);
    }
  }

  return {
    lavanderias,
    loading,
    atualizar: carregar
  };
}