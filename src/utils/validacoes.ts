export const validarEmail = (email: string): boolean => {
    return /[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validarSenha = (senha: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,12}$/.test(senha)
}

export const validarMaiorIdade = (dataString: string): boolean => {
    if (dataString.length !== 10) return false

    const [dia, mes, ano] = dataString.split('/').map(Number)
    const hoje = new Date()
    const nascimento = new Date(ano, mes - 1 , dia)

    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const diferencaMeses = hoje.getMonth() - nascimento.getMonth()

    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < nascimento.getDate())){
        idade--
    }

    return idade >= 18
} 