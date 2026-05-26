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
export async function esquecerSenha(email: string) {
    const response = await fetch(
      'http://localhost:5000/v1/semprelimpa/esquecisenha',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    )
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao solicitar recuperação de senha.')
    }
  
    return data
  }
  
  export async function resetarSenha(
    token: string,
    novaSenha: string
  ) {
    const response = await fetch(
      'http://localhost:5000/v1/semprelimpa/resetarsenha',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          novaSenha,
        }),
      }
    )
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(
        data.message || 'Erro ao resetar senha.'
      )
    }
  
    return data
  }