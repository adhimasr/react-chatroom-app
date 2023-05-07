import { useState } from 'react';
import { signIn } from '../../api/user';
import { UtilsInput, UtilsButton } from '../Utils';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value}));
  };
      
  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signIn(form);
    } catch (error) {
      console.log({name: 'Log error signin', error});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center p-4">
      <div className="bg-slate-900 sm:w-80 flex flex-col gap-6 rounded-2xl p-6">
        <span className="text-xl font-bold text-white text-center">Sign In</span>
        <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
          <UtilsInput name="email" placeholder="Email" value={form.email} onChange={handleInputChange} /> 
          <UtilsInput name="password" placeholder="Password" value={form.password} onChange={handleInputChange} /> 
          <UtilsButton text="Sign In" loading={isLoading} />
        </form>
        <span className="text-xs text-white text-center">
          No Account yet? <strong className="cursor-pointer">Sign Up</strong> instead
        </span>
      </div>
    </div>
  );
};

export default SignIn;