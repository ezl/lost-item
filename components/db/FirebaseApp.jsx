import firebase from 'firebase';

let firebaseApp;

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
