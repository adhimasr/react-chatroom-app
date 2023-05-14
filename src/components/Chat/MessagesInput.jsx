import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { AiOutlinePaperClip, AiOutlineSend } from 'react-icons/ai';
import { UtilsInput, UtilsBadge } from '../index';
import { timestamp } from '../../config/firebase';
import useStorage from '../../api/storage';
import useCollection from '../../api/collection';

const MessagesInput = ({ authUser }) => {
  const [message, setMessage] = useState({ text: '', image: '', video: '' });
  const { addDocToCollection } = useCollection('messages');
  const { uploadFile , isUploading } = useStorage(authUser);
  const fileInputRef = useRef(null);
  const isValidMessage =  !Object.values(message).every((value) => value === '');
  
  const sendMessages = (event) => {
    if (isValidMessage && (event.key === 'Enter' || event.type === 'click')) {
      event.preventDefault();
      addDocToCollection({
        email: authUser.email,
        date: timestamp,
        content: { ...message },
      });
      setMessage({ text: '', image: '', video: '' });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const result = await uploadFile(file);
      console.log({ result });
      setMessage((prevMessage) => ({
        ...prevMessage,
        image: result
      }));
    } catch (error) {
      console.log({ name: 'log handle file upload...', error });
    }
  };
  
  return (
    <div className="bg-slate-800 flex flex-row items-center gap-2 border-2 border-slate-700 border-solid p-4">
      <UtilsInput type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileUpload} />
      <UtilsBadge visible={message.image || message.video}>
        <AiOutlinePaperClip className={`h-6 w-6 text-[#E8ECED] ${isUploading ? 'animate-pulse cursor-wait' : 'cursor-pointer'}`} onClick={!isUploading ? () => fileInputRef.current.click() : null} />
      </UtilsBadge>
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

MessagesInput.propTypes = { authUser: PropTypes.object };

export default MessagesInput;