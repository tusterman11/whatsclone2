import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chat } from "../services/chat";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  async function handleRegisterPhone(data) {
    const { phone, name, appName } = data;
    const me = await chat.register({
      phone,
      displayName: name,
      appName,
    });
    localStorage.setItem("senac-phone", me.phone);
    localStorage.setItem("senac-name", name);
    localStorage.setItem("senac-app-name", appName);
    navigate("/contacts");
  }

  function handleLogout() {
    localStorage.removeItem("senac-phone");
    localStorage.removeItem("senac-name");
    localStorage.removeItem("senac-app-name");
    navigate("/");
  }

  useEffect(() => {
    async function restoreSession() {
      const savedPhone = localStorage.getItem("senac-phone");
      if (savedPhone) {
        await chat.identify(savedPhone);
        navigate("/contacts");
      } else {
        navigate("/");
      }
      setReady(true);
    }
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = {
    registerPhone: handleRegisterPhone,
    logout: handleLogout,
  };

  if (!ready) return null; // evita piscar tela errada enquanto restaura sessão

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat deve ser usado dentro de ChatProvider");
  }

  return context;
}
