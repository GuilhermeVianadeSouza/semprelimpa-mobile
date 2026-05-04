import { useState } from "react";
import { mensagensDeERRO } from "../utils/erros";
import { validarEmail, validarMaiorIdade, validarSenha } from "../utils/validacoes";

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
            if(nome.trim().length < 3  || nome.trim().length > 100) return setMensagemErro
        }
    }











}