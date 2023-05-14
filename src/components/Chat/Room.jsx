import { useAuthUser } from '../../api/user';
import { ChatHeader, ChatBubble, ChatMessagesInput } from '../index';

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