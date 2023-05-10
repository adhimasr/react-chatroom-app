import { useState, useRef } from 'react';
import { UtilsInput } from '../Utils';
import { timestamp } from '../../config/firebase';
import { useCollection } from '../../api/collection';
import { useAuthUser } from '../../api/user';
import useStorage from '../../api/storage';
import { AiOutlinePaperClip, AiOutlineSend } from 'react-icons/ai';

const MessagesInput = () => {
  const [message, setMessage] = useState({ text: '',file: '' });
  const { addDocToCollection } = useCollection('messages');
  const authUser = useAuthUser();
  const fileInputRef = useRef(null);
  const uploadFile = useStorage();

  const sendMessages = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      const chat = {
        email: authUser.email,
        date: timestamp,
        content: {
          text: message.text,
          image: message.file
        },
      };

      addDocToCollection(chat);
      setMessage({ text: '', file: '' });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await uploadFile(file);
        setMessage((prevMessage) => ({
          ...prevMessage,
          file: result
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="bg-slate-800 flex flex-row items-center gap-2 border-2 border-slate-700 border-solid p-4">
      <UtilsInput type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileUpload} />
      <AiOutlinePaperClip className="h-6 w-6 text-[#E8ECED] cursor-pointer" onClick={() => fileInputRef.current.click()} />
      <UtilsInput
        name="message"
        placeholder="Messages..."
        value={message.text}
        onChange={(event) => setMessage((prevMessage) => ({ ...prevMessage, text: event.target.value }))}
        onKeyPress={sendMessages}
      />
      <AiOutlineSend className="text-[#E8ECED] h-6 w-6 cursor-pointer" onClick={sendMessages} />
    </div>
  );
};

export default MessagesInput;