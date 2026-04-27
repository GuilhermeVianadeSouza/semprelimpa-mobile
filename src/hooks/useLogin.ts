import { useState } from "react"; 

export function useLogin(){
    const [modalVisivel, setModalVisivel] = useState(false)

    const abrirModal = () => setModalVisivel(true)
    const fecharModal = () => setModalVisivel(false)

    const usuarioSelecionouItem = (metodo: 'cpf' | 'email') => {
        setModalVisivel(false)

        console.log("funfou")
    }

    return {
        modalVisivel,
        abrirModal,
        fecharModal,
        usuarioSelecionouItem
    }
}