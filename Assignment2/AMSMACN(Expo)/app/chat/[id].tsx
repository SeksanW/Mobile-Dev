import { useLocalSearchParams } from "expo-router";
import ChatScreen from "../../components/ChatScreen";

export default function ChatRoute() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  return <ChatScreen chatId={String(id)} title={String(name ?? "Chat")} />;
}