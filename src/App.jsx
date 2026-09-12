import { Route, Routes } from "react-router-dom";
import RegisterScreen from "./pages/RegisterScreen";
import ChatScreen from "./pages/ChatScreen";
import ContactsListScreen from "./pages/ContactsListScreen";
import { useChat } from "./context/ChatContext";

function App() {
  const chat = useChat();
  console.log({ chat });

  return (
    <Routes>
      <Route path="/" element={<RegisterScreen />} />
      <Route path="/contacts" element={<ContactsListScreen />} />
      <Route path="/chat/:phone" element={<ChatScreen />} />
    </Routes>
  );
}

export default App;
