import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, serverTimestamp, collection, query, where, getDocs, orderBy, addDoc, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Auth Helpers
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Stats Helpers
export const incrementVisitCount = async () => {
  const statsRef = doc(db, 'stats', 'global');
  try {
    const statsDoc = await getDoc(statsRef);
    if (!statsDoc.exists()) {
      await setDoc(statsRef, { visitCount: 1, lastVisit: serverTimestamp() });
    } else {
      await updateDoc(statsRef, {
        visitCount: increment(1),
        lastVisit: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error incrementing visit count:', error);
  }
};

// History Helpers
export const savePracticeResult = async (userId: string, topicId: string, problemId: string, isCorrect: boolean) => {
  try {
    await addDoc(collection(db, 'history'), {
      userId,
      topicId,
      problemId,
      isCorrect,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving practice result:', error);
  }
};

export const getAllHistory = async () => {
  try {
    const q = query(collection(db, 'history'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting all history:', error);
    return [];
  }
};
