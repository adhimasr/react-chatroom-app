import { useCollection } from '../../api/collection';
import { format, fromUnixTime } from 'date-fns';

const ChatBubble = () => {
  const { collectionRef, isLoading } = useCollection('messages');

  return (
    <div className="bg-slate-900 overflow-x-auto flex flex-1 flex-col gap-4 p-4">
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
        <div key={cr.id} className="flex flex-col gap-2">
          <span className="text-xs text-white">{cr.name}</span>
          <div className="bg-slate-600 rounded-xl p-4">
            <span className="text-white">
              {cr.message}
            </span>
          </div>
          <span className="block text-xs text-white ml-auto">{format(fromUnixTime(cr.createdAt.seconds), 'hh:mm a')}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBubble;