import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  projectId: "home-market-98990",
  appId: "1:270669266687:web:4fab9819138dcea94d56ca",
  databaseURL:
    "https://home-market-98990-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "home-market-98990.appspot.com",
  locationId: "europe-west",
  apiKey: "AIzaSyCZPDCr9cFXreSs0zztMe0B6rZEpLhK4JA",
  authDomain: "home-market-98990.firebaseapp.com",
  messagingSenderId: "270669266687",
  measurementId: "G-NGRHT9K4RP",
});
