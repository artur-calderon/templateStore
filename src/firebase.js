// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7v6t82IlgYivcH4MxvLY0zAdJ2OFge8E',
  authDomain: 'templatestore-fc2dc.firebaseapp.com',
  projectId: 'templatestore-fc2dc',
  storageBucket: 'templatestore-fc2dc.appspot.com',
  messagingSenderId: '537863752457',
  appId: '1:537863752457:web:b0583ddf84e0ea4c5fe1d8',
  measurementId: 'G-KCCC5G1QC9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export { app }
