import { logOut } from '../../api/user';
import { UtilsButton } from '../Utils';

const ChatHeader = () => {
  return (
    <nav className="bg-slate-800 flex flex-row items-center justify-between gap-2 border-2 border-slate-700 border-solid p-4">
      <span className="text-white font-bold">{'React-Firebase-Chatroom'}</span>
      <UtilsButton className="text" text="Log Out" action={logOut} />
    </nav>
  );
};

export default ChatHeader;