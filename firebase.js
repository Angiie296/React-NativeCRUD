import firebase from 'firebase';
//import 'firebase/firestone';

require("firebase/firestore");
const config={
    apiKey: "AIzaSyDk9a3h-Y57Ba6ki246Y4odGe1UoM4ETUs",
    authDomain: "proyectocliente-63539.firebaseapp.com",
    databaseURL: "https://proyectocliente-63539.firebaseio.com",
    projectId: "proyectocliente-63539",
    storageBucket: "proyectocliente-63539.appspot.com",
    messagingSenderId: "168726200736",
    appId: "1:168726200736:web:5694c38694586e948f64c5",
    measurementId: "G-K3JV4K0XW4"

};
firebase.initializeApp(config);

export default firebase;