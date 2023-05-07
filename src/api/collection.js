import { useState, useEffect } from 'react';
import { firestore } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

const useCollection = (myCollection) => {
  const [collectionRef, setCollectionRef] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, myCollection), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        doc.data().createdAt && docs.push({ ...doc.data(), id: doc.id });
      });
      setCollectionRef(docs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [myCollection]);

  const addDocToCollection = async (doc) => {
    try {
      const response = await addDoc(collection(firestore, myCollection), doc);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  return { addDocToCollection, collectionRef, isLoading };
};

export { useCollection };