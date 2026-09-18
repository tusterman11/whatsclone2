function MessageBubble({ message, isMine }) {
  return (
    <div
      className={`max-w-[70%] rounded-lg p-2 ${
        isMine
          ? "self-end bg-green-500 text-white"
          : "self-start bg-white text-gray-800"
      }`}
    >
      {message.text}
    </div>
  );
}

export default MessageBubble;
