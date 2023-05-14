import { useState } from 'react';
import { signIn, signUp } from '../../api/user';
import { UtilsInput, UtilsButton } from '../index';

const SignIn = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('signin');
  
  const buttonData = {
    signin: { label: 'Sign In' },
    signup: { label: 'Sign Up' }
  };

  const handleButtonClick = (buttonidx) => {
    setSelectedButton(buttonidx);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value}));
  };
      
  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const authFunction = selectedButton === 'signin' ? signIn : signUp;
      await authFunction(form);
    } catch (error) {
      console.log({ name: 'Log error auth', error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center p-4">
      <div className="bg-slate-900 w-full md:max-w-sm flex flex-col gap-6 rounded-2xl p-6">
        <div className="grid grid-cols-2 border-[1px] border-slate-600 rounded-3xl">
          {Object.entries(buttonData).map(([buttonidx, button]) => (
            <span key={buttonidx} className={`text-sm text-center text-white font-bold cursor-pointer rounded-3xl p-2 ${selectedButton === buttonidx ? 'bg-slate-600' : ''}`} onClick={() => handleButtonClick(buttonidx)} >
              {button.label}
            </span>
          ))}
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleAuth}>
          {selectedButton === 'signup' && (
            <UtilsInput name="username" placeholder="Username" value={form.username} onChange={handleInputChange} />
          )}
          <UtilsInput name="email" placeholder="Email" value={form.email} onChange={handleInputChange} /> 
          <UtilsInput name="password" placeholder="Password" value={form.password} onChange={handleInputChange} /> 
          <UtilsButton text={buttonData[selectedButton].label} loading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default SignIn;