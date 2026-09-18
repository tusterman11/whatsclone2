import { useEffect, useState } from "react";
import ScreenHeader from "../../layout/ScreenHeader";
import { chat } from "../../../services/chat";

function ChatHeader({ phone, onBack }) {
  const [contactName, setContactName] = useState(phone); // fallback while loading

  useEffect(() => {
    async function loadContactName() {
      const contacts = await chat.listContacts();
      const contact = contacts.find((c) => c.phone === phone);
      if (contact) {
        setContactName(contact.displayName ?? contact.display_name);
      }
    }
    loadContactName();
  }, [phone]);

  return <ScreenHeader title={contactName} subtitle={phone} onBack={onBack} />;
}

export default ChatHeader;
