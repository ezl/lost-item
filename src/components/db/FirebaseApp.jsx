import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
let firebaseApp;

// const defaultConfig = {
//   apiKey: 'AIzaSyDwiKWP31SE4XnL0-_uSvNXORH9O-pp4u0',
//   authDomain: 'lost-item-ba357.firebaseapp.com',
//   databaseURL: 'https://lost-item-ba357.firebaseio.com',
//   storageBucket: 'lost-item-ba357.appspot.com',
//   messagingSenderId: '205337206435',
// };
const defaultConfig = {
  apiKey: 'AIzaSyC7v94KXLrdxVAKCGTQGzXQgjmr0iYdA0Q',
  authDomain: 'lostfound-7b419.firebaseapp.com',
  databaseURL: 'https://lostfound-7b419.firebaseio.com',
  storageBucket: 'lostfound-7b419.appspot.com',
  messagingSenderId: '205337206435',
};


export function init(config = defaultConfig) {
  firebase.initializeApp(config);

  firebaseApp = firebase;

  return firebaseApp;
}

export function getFirebaseApp() {
  return firebaseApp || init();
}
