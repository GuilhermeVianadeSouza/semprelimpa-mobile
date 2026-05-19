 export const realizarLogin = async (identificacaoPuro: string, senha: string, metodoEscolhido: string) => {
    const endpoint = metodoEscolhido === 'e_mail'
    ? "Loginemail"
    : "Logincpf"    
    
    const payload = 
            metodoEscolhido === 'e_mail'
                ? { e_mail: identificacaoPuro, senha }
                : { cpf: identificacaoPuro, senha }
    const url = `http://localhost:5000/v1/SempreLimpa/${endpoint}`

        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.mensagemErro || "Erro ao fazer login")
    }
 return data
}