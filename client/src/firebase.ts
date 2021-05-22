import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
};
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const storage = firebase.storage();

export const marathonsRef = databaseRef.child('marathons');
export const tasksRef = databaseRef.child('tasks');

export default firebase;
