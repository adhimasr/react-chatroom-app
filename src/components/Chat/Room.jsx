import ChatHeader from './Header';
import ChatBubble from './Bubble';
import ChatMessagesInput from './MessagesInput';

const ChatRoom = () => {
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ChatHeader/>
      <ChatBubble/>
      <ChatMessagesInput />
    </div>
  );
};

export default ChatRoom;