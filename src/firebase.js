import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBgxDesq-NrwIAv1PIAeprZwJ6hUeanLWQ",
    authDomain: "lda-projects.firebaseapp.com",
    databaseURL: "https://lda-projects.firebaseio.com",
    projectId: "lda-projects",
    storageBucket: "",
    messagingSenderId: "848756726716"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
