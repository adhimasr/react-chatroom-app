import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const useAuthUser = () => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthUser(user);
      } else {
        localStorage.removeItem('user');
        setAuthUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return authUser;
};

const signIn = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('user', JSON.stringify(response.user));
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signUp = async ({ email, password }) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const logOut = async () => {
  try {
    const response = await signOut(auth);
    localStorage.removeItem('user');
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { signIn, signUp, logOut, useAuthUser };