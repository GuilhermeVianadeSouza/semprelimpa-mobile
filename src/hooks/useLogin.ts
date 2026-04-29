import { useState } from "react"; 

export function useLogin(metodoInicial: 'cpf' | 'email'){

    const [metodoEscolhido, setMetodoEscolhido] = useState<'cpf' | 'email'>(metodoInicial)
    const [identificacao, setIdentificacao] = useState('')
    const [identificacaoPuro, setIdentificacaoPuro] = useState('')
    const [senha, setSenha] = useState('')

    //Lógica dinamica para a UI
    const labelDinamico = metodoEscolhido === 'cpf' ? 'Seu CPF' : 'Seu E-mail'
    const placeholderDinamico = metodoEscolhido === 'cpf' ? 'CPF: 000.000.000-00' : 'exemplo@email.com'

    //acoes formulario
    const lidarComVoltar = () =>{
            console.log("Está tentando retornar")
        }
    
        const lidarComLogin = () => {
            console.log(`Tentativa de Login via ${metodoEscolhido}:`);
            console.log({documento: identificacaoPuro, senha})
        }

    return {
        form: {
            metodoEscolhido,
            identificacao,
            identificacaoPuro,
            senha,
            labelDinamico,
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


