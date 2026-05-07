import { useNavigation } from "@react-navigation/native";
import { mensagensDeERRO } from "../utils/erros";
import { useState } from "react"; 

export function useLogin(metodoInicial: 'cpf' | 'e_mail'){
    //Responsavel pela navegação entre páginas
    const navigation = useNavigation<any>()

    //Constantes de uso de estado, podendo variar como na primeira constante
    const [metodoEscolhido] = useState<'cpf' | 'e_mail'>(metodoInicial)
    const [identificacao, setIdentificacao] = useState('')
    const [identificacaoPuro, setIdentificacaoPuro] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)

    //Lógica dinamica para a UI
    const labelDinamico = metodoEscolhido === 'cpf' ? 'Seu CPF' : 'Seu E-mail'
    const placeholderDinamico = metodoEscolhido === 'cpf' ? 'CPF: 000.000.000-00' : 'exemplo@email.com'

    //Validações informacoes
    const validarEmail = (e_mail: string) => {
        const regex = /[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(e_mail)
    }

    const validarSenha= (senha: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,12}$/
        return regex.test(senha)
    }

    //acoes formulario
    const lidarComVoltar = () =>{
            navigation.goBack()
        }
    
    const lidarComLogin = async () => {
        setMensagemErro(null)

        if(metodoEscolhido === 'e_mail'){
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

                    !!!-- ADIÇÃO FEITA PARA CHAMADA DA API --!!!
                    
           try {
            const payload = 
                metodoEscolhido === 'e_mail'
                    ? { e_mail: identificacaoPuro, senha }
                    : { cpf: identificacaoPuro, senha }

            const response = await fetch(
                "http://localhost:5000/v1/SempreLimpa/Loginemail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            )

            const data = await response.json()

            if (response.status === 200) {
                console.log("Login OK:", data)
            }else {
                setMensagemErro(data.mensagemErro || "Erro ao fazer login")
            }

           } catch (error) {
            console.log(error)
            setMensagemErro("Erro ao conectar com o servidor")

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