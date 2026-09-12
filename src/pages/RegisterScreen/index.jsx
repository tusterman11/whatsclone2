import { useState } from "react";
import Button from "../../components/Button";
import MainLayout from "../../components/layout/MainLayout";
import TextField from "../../components/TextField";
import { useChat } from "../../context/ChatContext";

function RegisterScreen() {
  const chat = useChat();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [appName, setAppName] = useState("");
  const [phoneError, setPhoneError] = useState();

  function handleSubmit() {
    const regex = /^\d+$/;
    if (!regex.test(phone)) {
      setPhoneError("Telefone inválido!");
      return;
    }
    chat.registerPhone({
      phone,
      name,
      appName,
    });
  }

  return (
    <MainLayout title="Senac Chat" subtitle="Cadastre seu número">
      <div className="flex flex-col gap-2">
        <TextField
          id="phone"
          label="Telefone"
          value={phone}
          onChange={(value) => setPhone(value)}
          error={phoneError}
        />
        <TextField
          id="name"
          label="Seu nome"
          value={name}
          onChange={(value) => setName(value)}
        />
        <TextField
          id="app-name"
          label="Nome do app"
          value={appName}
          onChange={(value) => setAppName(value)}
        />
        <Button onClick={handleSubmit}>Entrar</Button>
      </div>
    </MainLayout>
  );
}

export default RegisterScreen;
