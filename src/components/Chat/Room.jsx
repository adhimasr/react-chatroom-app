import { useAuthUser } from '../../api/user';
import ChatHeader from './Header';
import ChatBubble from './Bubble';
import ChatMessagesInput from './MessagesInput';

const ChatRoom = () => {
  const authUser = useAuthUser();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ChatHeader/>
      <ChatBubble authUser={authUser} />
      <ChatMessagesInput authUser={authUser} />
    </div>
  );
};

export default ChatRoom;