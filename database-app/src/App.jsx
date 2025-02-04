import Header from './components/Navbar/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Body from './components/Body/Body.jsx'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0nyt4B7729YhL7k-5krEoGxrIJ9nXQ0A",
  authDomain: "mlb-visionbase.firebaseapp.com",
  projectId: "mlb-visionbase",
  storageBucket: "mlb-visionbase.firebasestorage.app",
  messagingSenderId: "954641584866",
  appId: "1:954641584866:web:076f83f1bfe5cd72a244bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  return(
    <>
    <Header/>
    <Body/>
    <Footer/>
    </> 
  );
}

export default App


