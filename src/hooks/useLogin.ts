import { useNavigation } from "@react-navigation/native";
import { mensagensDeERRO } from "../utils/erros";
import { validarEmail, validarSenha } from "../utils/validacoes";
import { useState } from "react"; 

export function useLogin(metodoInicial: 'cpf' | 'email'){
    //Responsavel pela navegação entre páginas
    const navigation = useNavigation<any>()

    //Constantes de uso de estado, podendo variar como na primeira constante
    const [metodoEscolhido] = useState<'cpf' | 'email'>(metodoInicial)
    const [identificacao, setIdentificacao] = useState('')
    const [identificacaoPuro, setIdentificacaoPuro] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)

    //Lógica dinamica para a UI
    const labelDinamico = metodoEscolhido === 'cpf' ? 'Seu CPF' : 'Seu E-mail'
    const placeholderDinamico = metodoEscolhido === 'cpf' ? 'CPF: 000.000.000-00' : 'exemplo@email.com'

    //acoes formulario
    const lidarComVoltar = () =>{
            navigation.goBack()
        }
    
    const lidarComLogin = () => {
        setMensagemErro(null)

        if(metodoEscolhido === 'email'){
            if(!validarEmail(identificacaoPuro)){
                setMensagemErro (mensagensDeERRO.validacao.emailInvalido)
                return
            }
           } else {
            if(identificacaoPuro.length !== 11){
                setMensagemErro (mensagensDeERRO.validacao.cpfIncompleto)
                return
            }
           }

           if(!validarSenha(senha)){
            setMensagemErro(mensagensDeERRO.validacao.senhaFraca)
            return
           }

           console.log("Sucesso! Dados prontos para continuar: ", {identificacaoPuro, senha})
        }

    return {
        form: {
            metodoEscolhido,
            identificacao,
            identificacaoPuro,
            senha,
            labelDinamico,
            mensagemErro,
            placeholderDinamico,
            setIdentificacao,
            setIdentificacaoPuro,
            setSenha
        },
        acoes: {
            lidarComVoltar,
            lidarComLogin
        }
    }
}


