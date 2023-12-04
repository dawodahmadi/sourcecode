import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import config from '../../functions/config.json';

const firebaseConfig = {
  apiKey: config.googleApiKeys.web,
  authDomain: `${config.firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${config.firebaseProjectId}.firebaseio.com`,
  projectId: config.firebaseProjectId,
  storageBucket: `${config.firebaseProjectId}.appspot.com`,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}