import './App.css';
import { useAuthUser } from './api/user';
import { ChatRoom, AuthForm } from './components/index';

const App = () => {
  const authUser = useAuthUser();
  return (
    <>
      {authUser ? <ChatRoom /> : <AuthForm />}
    </>
  );
};

export default App;
