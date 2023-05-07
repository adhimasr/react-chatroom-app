import { useState } from 'react';
import { UtilsInput } from '../Utils';
import { timestamp } from '../../config/firebase';
import { useCollection } from '../../api/collection';

const MessagesInput = () => {
  const { addDocToCollection } = useCollection('messages');

  const [message, setMessage] = useState('');

  const sendMessages = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const chat = {
        name: 'Adhimas',
        createdAt: timestamp,
        message
      };

      addDocToCollection(chat);
      setMessage('');
    }
  };
  
  return (
    <div className="bg-slate-800 flex flex-row items-center gap-2 border-2 border-slate-700 border-solid p-4">
      <UtilsInput 
        name="message" 
        placeholder="Messages..." 
        value={message} 
        onChange={(event) => setMessage(event.target.value)} 
        onKeyPress={sendMessages} 
      /> 
    </div>
  );
};

export default MessagesInput;