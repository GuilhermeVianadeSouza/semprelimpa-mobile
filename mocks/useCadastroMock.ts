import { useState } from 'react';

export const useCadastroMock = () => {
    // Controle de fluxo
    const [etapaAtual, setEtapaAtual] = useState(1);

    // Etapa 1: Dados Pessoais
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');

    // Etapa 2: Endereço
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('São Paulo'); // Já deixei "SP" para simular o ViaCEP bloqueando o campo
    const [estado, setEstado] = useState('SP');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');

    // Etapa 3: Segurança
    const [senha, setSenha] = useState('');

    // Agrupamos tudo no objeto form (Exatamente como o seu hook real deve fazer)
    const form = {
        etapaAtual,
        nome, setNome,
        email, setEmail,
        telefone, setTelefone,
        dataNascimento, setDataNascimento,
        cpf, setCpf,
        cep, setCep,
        rua, setRua,
        bairro, setBairro,
        cidade, setCidade,
        estado, setEstado,
        numero, setNumero,
        complemento, setComplemento,
        senha, setSenha
    };

    // Ações de navegação do formulário
    const acoes = {
        avancarEtapa: () => {
            console.log(`Avançando para etapa ${etapaAtual + 1}`);
            setEtapaAtual(prev => prev + 1);
        },
        voltarEtapa: () => {
            console.log(`Voltando para etapa ${etapaAtual - 1}`);
            setEtapaAtual(prev => prev - 1);
        },
        finalizarCadastro: () => {
            console.log('--- ENVIANDO PARA A API MOCK ---');
            console.log('Dados do usuário:', form);
            alert('Cadastro finalizado com sucesso no Mock!');
        }
    };

    return { form, acoes };
};