import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthUser } from './user';
import { storage } from '../config/firebase';

const useStorage = () => {
  const authUser = useAuthUser();

  const uploadFile = async (file) => {
    try {
      const storageRef = ref(storage, `${authUser.uid}/image/${file.name}`);
  
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  return uploadFile;
};

export default useStorage;