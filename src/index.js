import React from 'react';
import ReactDOM from 'react-dom';
// import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

// firebase.initializeApp({
//   apiKey: "AIzaSyA0YLy3BIf4ph0va_6AurvbUPHVaTTSvtw",
//   authDomain: "hex-blog-backend-994ab.firebaseapp.com",
//   databaseURL: "https://hex-blog-backend-994ab.firebaseio.com",
//   projectId: "hex-blog-backend-994ab",
//   storageBucket: "hex-blog-backend-994ab.appspot.com",
//   messagingSenderId: "898102284917",
//   appId: "1:898102284917:web:ce5f2744b2ae61184d5e3c",
//   measurementId: "G-J4S5GRLWV3"
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
