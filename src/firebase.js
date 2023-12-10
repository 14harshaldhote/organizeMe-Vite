import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
//import { deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config options
  // apiKey: "AIzaSyDmHeUM8t7ZRtjabdj6aGbd9HyA8hDStWo",
  // authDomain: "todo-app-fb723.firebaseapp.com",
  // projectId: "todo-app-fb723",
  // storageBucket: "todo-app-fb723.appspot.com",
  // messagingSenderId: "654795306478",
  // appId: "1:654795306478:web:851f12f080944e73530aff",
  // measurementId: "G-3WJNBL7SHK"
  apiKey: "AIzaSyAXKOnWNMUAuo6nBOf9SPe83-qAg5qh6JM",
  authDomain: "organize-me-bb713.firebaseapp.com",
  projectId: "organize-me-bb713",
  storageBucket: "organize-me-bb713.appspot.com",
  messagingSenderId: "870264388515",
  appId: "1:870264388515:web:b418b9f7631c02feb67816",
  measurementId: "G-5YRBKQPRW8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const todosCollection = collection(db, 'todos'); // Corrected this line

export { db, auth,todosCollection };
