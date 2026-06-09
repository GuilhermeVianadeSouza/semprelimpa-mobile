import React, {
    createContext,
    useContext,
    useEffect,
    useState
  } from "react";
  
  import {
    verificarSeEstaLogado,
    efetuarLogout
  } from "../services/authService";
  
  interface AuthContextData {
    usuarioLogado: boolean;
    carregando: boolean;
    login: () => void;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
  );
  
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [carregando, setCarregando] = useState(true);
  
    useEffect(() => {
      carregarAutenticacao();
    }, []);
  
    async function carregarAutenticacao() {
      try {
        const logado = await verificarSeEstaLogado();
        setUsuarioLogado(logado);
      } finally {
        setCarregando(false);
      }
    }
  
    function login() {
      setUsuarioLogado(true);
    }
  
    async function logout() {
      await efetuarLogout();
      setUsuarioLogado(false);
    }
  
    return (
      <AuthContext.Provider
        value={{
          usuarioLogado,
          carregando,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(AuthContext);
  }