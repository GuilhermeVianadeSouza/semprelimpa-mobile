import { useState } from "react";
import { buscarCepViaCep } from "../services/viaCepService"; 
import { mensagensDeERRO } from "../utils/erros";
import { apenasNumeros, validarCep, validarCpf, validarEmail, validarMaiorIdade, validarSenha, validarTelefone } from "../utils/validacoes";

export function useCadastro(){

    const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3>(1) 
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [cpf, setCpf] = useState("")

    const [cep, setCep] = useState("")
    const [bairro, setBairro] = useState("")
    const [rua, setRua] = useState("")
    const [estado, setEstado] = useState("")
    const [cidade, setCidade] = useState("")
    const [complemento, setComplemento] = useState("")
    const [numero, setNumero] = useState("")
    const [buscarCep, setBuscarCep] = useState(false)

    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [fotoUri, setFotoUri] = useState<string | null>(null)

    const avancarEtapa = () => {
        setMensagemErro(null)

        if (etapaAtual === 1) {
            if(nome.trim().length < 3  || nome.trim().length > 100) return setMensagemErro(mensagensDeERRO.preencherCampo.nome)
            if(!validarEmail(email)) return setMensagemErro(mensagensDeERRO.validacao.emailInvalido)
            if(!validarCpf(cpf)) return setMensagemErro(mensagensDeERRO.validacao.cpfIncompleto)
            if(!validarTelefone(telefone)) return setMensagemErro
            if(!validarMaiorIdade(dataNascimento)) return setMensagemErro(mensagensDeERRO.preencherCampo.idade)
            setEtapaAtual(2)
        }
        else if (etapaAtual === 2) {
            if(!validarCep(cep)) return setMensagemErro(mensagensDeERRO.preencherCampo.cep)
            if(rua.trim() === '') return setMensagemErro(mensagensDeERRO.preencherCampo.rua)
            if(numero.trim() === '') return setMensagemErro(mensagensDeERRO.preencherCampo.numero)
            if(bairro.trim() === '') return setMensagemErro(mensagensDeERRO.preencherCampo.bairro)
            
            setEtapaAtual(3)
        }
    }

    const finalizarCadastro = () => {
        setMensagemErro(null)

        if(!validarSenha(senha)) return setMensagemErro (mensagensDeERRO.validacao.senhaFraca)
        if(senha !== confirmarSenha) return setMensagemErro (mensagensDeERRO.validacao.senhasDiferentes)

            console.log("Dados para a API:", {
                nome, email, telefone, cpf, dataNascimento,
                endereco: { cep, rua, numero, complemento, bairro, cidade, estado},
                senha, fotoUri
            })
    }

    const voltarEtapa = () => {
        setMensagemErro(null)
        if (etapaAtual > 1) {
            setEtapaAtual((prev) => (prev - 1) as 1| 2 | 3)
        }
    }

    const atualizarCep = async (cepDigitado: string) => {
        setCep(cepDigitado)

        const cepApenasNumeros = apenasNumeros(cepDigitado)

        if(cepApenasNumeros.length === 8) {
            setBuscarCep(true)
            setMensagemErro(null)

            const endereco = await buscarCepViaCep(cepApenasNumeros)

            if(endereco){
                setRua(endereco.logradouro)
                setBairro(endereco.bairro)
                setCidade(endereco.localidade)
                setEstado(endereco.uf)
            } else {
                setMensagemErro(mensagensDeERRO.preencherCampo.cep)
            }

            setBuscarCep(false)
        }
    }

    return {
        form:{
            etapaAtual, mensagemErro, nome, email, telefone, cpf, dataNascimento,
            setNome, setEmail, setTelefone, setCpf, setDataNascimento,
            cep, rua, numero, complemento, bairro, cidade, estado, buscarCep,
            setCep, setRua, setNumero, setComplemento, setBairro, setCidade, setEstado,
            senha, confirmarSenha, fotoUri, setSenha, setConfirmarSenha, setFotoUri
        },
        acoes: {avancarEtapa, voltarEtapa, finalizarCadastro, atualizarCep}
    }
}