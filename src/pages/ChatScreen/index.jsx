import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScreenBody from "../../components/layout/ScreenBody";
import ChatHeader from "../../components/chat/ChatHeader";
import MessageList from "../../components/chat/MessageList";
import MessageInput from "../../components/chat/MessageInput";
import { chat } from "../../services/chat";

function ChatScreen() {
  const navigate = useNavigate();
  const { phone } = useParams();
  const myPhone = localStorage.getItem("senac-phone");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function loadHistory() {
      const thread = await chat.getHistory({ with: phone });
      setMessages(thread);
    }
    loadHistory();

    const unsubscribe = chat.onMessage((message) => {
      const isThisConversation =
        message.from_phone === phone || message.to_phone === phone;
      if (isThisConversation) setMessages((prev) => [...prev, message]);
    });

    return () => unsubscribe();
  }, [phone]);

  async function handleSend() {
    if (!text.trim()) return;
    await chat.sendMessage({ to: phone, text });
    setMessages((prev) => [
      ...prev,
      { from_phone: myPhone, to_phone: phone, text },
    ]);
    setText("");
  }

  return (
    <>
      <ChatHeader phone={phone} onBack={() => navigate("/contacts")} />
      <ScreenBody>
        <div className="mx-auto flex h-full max-w-xl flex-col gap-2">
          <MessageList messages={messages} myPhone={myPhone} />
          <MessageInput value={text} onChange={setText} onSend={handleSend} />
        </div>
      </ScreenBody>
    </>
  );
}

export default ChatScreen;
