import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

const useStorage = (authUser) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const uploadFile = async (file) => {
    try {
      setIsUploading(true);
      
      const storageRef = ref(storage, `${authUser.uid}/image/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.log({ name: 'log error upload file...', error });
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};

export default useStorage;