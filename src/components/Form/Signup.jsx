import PropTypes from 'prop-types';
import { useState } from 'react';
import { signUp } from '../../api/user';
import { UtilsInput, UtilsButton } from '../Utils';

const SignUp = ({ loggedIn }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value}));
  };
      
  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response =  await signUp(form);
      if (response) { loggedIn(true); }
    } catch (error) {
      console.log({name: 'Log error signup', error});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center p-4">
      <div className="bg-slate-900 sm:w-80 flex flex-col gap-6 rounded-2xl p-6">
        <span className="text-xl font-bold text-white text-center">Sign In</span>
        <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
          <UtilsInput name="email" placeholder="Email" value={form.email} onChange={handleInputChange} /> 
          <UtilsInput name="password" placeholder="Password" value={form.password} onChange={handleInputChange} /> 
          <UtilsButton text="Sign Up" loading={isLoading} />
        </form>
        <span className="text-xs text-white text-center">
          Already have account? <strong className="cursor-pointer">Sign In</strong> instead
        </span>
      </div>
    </div>
  );
};

SignUp.propTypes = { loggedIn: PropTypes.func };

export default SignUp;