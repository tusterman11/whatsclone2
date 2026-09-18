import { useEffect, useRef } from "react";
import MessageBubble from "../MessageBubble";
import EmptyState from "../../EmptyState";

function MessageList({ messages, myPhone }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyState message="Envie a primeira mensagem!" />;
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-2">
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id ?? index}
          message={msg}
          isMine={msg.from_phone === myPhone}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
