import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { chat } from "../../services/chat";
import MessageInput from "../../components/chat/MessageInput";

function ChatScreen() {
  const { phone } = useParams(); // telefone do contato aberto
  const navigate = useNavigate();
  const myPhone = localStorage.getItem("senac-phone");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    async function loadHistory() {
      const thread = await chat.getHistory({ with: phone });
      setMessages(thread);
    }
    loadHistory();

    // escuta mensagens novas em tempo real
    const unsubscribe = chat.onMessage((message) => {
      const isThisConversation =
        message.from_phone === phone || message.to_phone === phone;
      if (isThisConversation) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => unsubscribe();
  }, [phone]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <MainLayout
      title={phone}
      subtitle="Conversa"
      onBack={() => navigate("/contacts")}
    >
      <div className="mx-auto flex h-full max-w-xl flex-col gap-2">
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-2">
          {messages.map((msg, index) => (
            <div
              key={msg.id ?? index}
              className={`max-w-[70%] rounded-lg p-2 ${
                msg.from_phone === myPhone
                  ? "self-end bg-green-500 text-white"
                  : "self-start bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <MessageInput value={text} onChange={setText} onSend={handleSend} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ChatScreen;
