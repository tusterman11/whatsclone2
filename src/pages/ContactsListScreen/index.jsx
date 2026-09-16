import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import MainLayout from "../../components/layout/MainLayout";
import TextField from "../../components/TextField";
import { useChat } from "../../context/ChatContext";
import { chat } from "../../services/chat";

chat.listContacts();

export default function ContactsListScreen() {
  const navigate = useNavigate();
  const { logout } = useChat();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function loadContacts() {
      const data = await chat.listContacts();
      setContacts(data);
    }
    loadContacts();
  }, []);

  const myPhone = localStorage.getItem("senac-phone");
  const filteredContacts = contacts
    .filter((contact) => contact.phone !== myPhone)
    .filter((contact) =>
      `${contact.displayName ?? contact.display_name} ${contact.phone}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  return (
    <MainLayout title="Contatos" subtitle="Escolha uma conversa">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <TextField
          id="search-contacts"
          label="Buscar contato"
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-col gap-2">
          {filteredContacts.length === 0 ? (
            <p className="py-6 text-center text-gray-600">
              Nenhum contato encontrado.
            </p>
          ) : (
            filteredContacts.map((contact) => (
              <Button
                key={contact.phone}
                onClick={() => navigate(`/chat/${contact.phone}`)}
              >
                <span className="flex flex-col text-left">
                  <strong>{contact.display_name}</strong>
                  <span>{contact.phone}</span>
                </span>
              </Button>
            ))
          )}
        </div>

        <Button onClick={logout}>Sair</Button>
      </div>
    </MainLayout>
  );
}
