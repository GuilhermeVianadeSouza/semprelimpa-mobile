import { useState } from "react";
import { mensagensDeERRO } from "../utils/erros";
import { validarCpf, validarEmail, validarMaiorIdade, validarSenha, validarTelefone } from "../utils/validacoes";

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
        if (etapaAtual === 2) {
            if(cep) return setMensagemErro(mensagensDeERRO.preencherCampo.cep)
        }
    }

    return {
        form:{

        },
        acoes: {avancarEtapa}
    }
}