// components/MessageList.tsx
import ChatBubble from './ChatBubble'

export default function MessageList({ messages }: { messages: { text: string; isOwn: boolean }[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.text} isOwn={msg.isOwn} />
      ))}
    </div>
  )
}
