import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { logOut } from '../../api/user';

const ChatHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-800 flex flex-row items-center justify-between gap-2 border-2 border-slate-700 border-solid p-4">
      <span className="text-white font-bold">{'React-Firebase-Chatroom'}</span>
      <div className="relative">
        <BiUserCircle className="text-[#E8ECED] w-8 h-6 cursor-pointer" onClick={toggleDropdown} />
        {isOpen && (
          <div className="absolute top-8 right-0 bg-slate-600 border border-slate-700 rounded-md shadow-md">
            <ul className="text-sm text-white font-semibold py-2">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-slate-700" onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ChatHeader;