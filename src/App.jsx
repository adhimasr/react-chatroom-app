import './App.css';
import { useAuthUser } from './api/user';
import ChatRoom from './components/Chat/Room';
import SignIn from './components/Form/Signin';

const App = () => {
  const authUser = useAuthUser();
  return (
    <>
      {authUser ? <ChatRoom /> : <SignIn />}
    </>
  );
};

export default App;
