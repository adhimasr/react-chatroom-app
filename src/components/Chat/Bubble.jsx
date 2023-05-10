import { useEffect, useRef } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { useCollection } from '../../api/collection';
import { useAuthUser } from '../../api/user';

const ChatBubble = () => {
  const { collectionRef, isLoading } = useCollection('messages');
  const messages = useRef(null);
  const authUser = useAuthUser();

  useEffect(() => {
    messages.current.scrollTop = messages.current.scrollHeight;
  }, [collectionRef]);

  return (
    <div ref={messages} className="bg-slate-900 overflow-x-auto flex flex-1 flex-col gap-4 p-4">
      {isLoading && (
        <div className="bg-slate-600 rounded-xl p-4">
          <div className="flex flex-row gap-1 animate-pulse">
            {[...Array(3)].map((_, index) => (
              <span key={index} className="block w-2 h-2 rounded-full bg-white"></span>
            ))}
          </div>
        </div>
      )}
      {collectionRef.map((cr) => (
        <div key={cr.id} className={`flex flex-col gap-2 ${authUser.email === cr.email ? 'ml-auto' : ''} ${cr.content.image ? 'max-w-[40%]' : 'max-w-[60%]'}`}>
          <span className="text-xs text-white">{cr.email}</span>
          <div className={`${authUser.email === cr.email ? 'bg-sky-600' : 'bg-slate-600'} rounded-xl p-4`}>
            {cr.content.image && <img src={cr.content.image} className="h-auto rounded-2xl" />}
            {cr.content.text && <span className="text-white">{cr.content.text}</span>}
          </div>
          <span className="block text-xs text-white ml-auto">{format(fromUnixTime(cr.date.seconds), 'hh:mm a')}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBubble;