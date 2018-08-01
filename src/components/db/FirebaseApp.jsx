import firebase from 'firebase';

let firebaseApp;

const defaultConfig = {
  apiKey: 'AIzaSyDwiKWP31SE4XnL0-_uSvNXORH9O-pp4u0',
  authDomain: 'lost-item-ba357.firebaseapp.com',
  databaseURL: 'https://lost-item-ba357.firebaseio.com',
  storageBucket: 'lost-item-ba357.appspot.com',
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
