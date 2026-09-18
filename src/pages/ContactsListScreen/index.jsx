import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import MainLayout from "../../components/layout/MainLayout";
import ContactItem from "../../components/chatlist/ContactItem";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useChat } from "../../context/ChatContext";
import { chat } from "../../services/chat";

function ContactsListScreen() {
  const { logout } = useChat();
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const myPhone = localStorage.getItem("senac-phone");

  useEffect(() => {
    async function loadContacts() {
      setContacts(await chat.listContacts());
    }
    loadContacts();
  }, []);

  const filteredContacts = contacts
    .filter((contact) => contact.phone !== myPhone)
    .filter((contact) =>
      `${contact.displayName ?? contact.display_name} ${contact.phone}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  return (
    <MainLayout title="Contatos" subtitle="Escolha uma Conversa">
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <TextField
          id="search-contacts"
          label="Buscar contato"
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-col gap-2">
          {filteredContacts.length === 0 ? (
            <EmptyState message="Nenhum contato encontrado." />
          ) : (
            filteredContacts.map((contact) => (
              <ContactItem key={contact.phone} contact={contact} />
            ))
          )}
        </div>

        <Button onClick={logout}>Log out</Button>
      </div>
    </MainLayout>
  );
}

export default ContactsListScreen;
