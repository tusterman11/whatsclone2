import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import MainLayout from "../../components/layout/MainLayout";
import TextField from "../../components/TextField";
import { useChat } from "../../context/ChatContext";

const fakeContacts = [
  { id: 1, name: "Levi", phone: "11999990000" },
  { id: 2, name: "Imbecil", phone: "11999990001" },
  { id: 3, name: "Bluezao", phone: "11999990002" },
];

function ContactsListScreen() {
  const navigate = useNavigate();
  const { logout } = useChat();
  const [search, setSearch] = useState("");

  const filteredContacts = fakeContacts.filter((contact) =>
    `${contact.name} ${contact.phone}`
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
                key={contact.id}
                onClick={() => navigate(`/chat/${contact.phone}`)}
              >
                <span className="flex flex-col text-left">
                  <strong>{contact.name}</strong>
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

export default ContactsListScreen;
