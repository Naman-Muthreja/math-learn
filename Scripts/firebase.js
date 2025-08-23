import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYhVBcNcYDIS38bCVTrZZ6JX8UKq54Isg",
  authDomain: "math-celerate.firebaseapp.com",
  projectId: "math-celerate",
  storageBucket: "math-celerate.firebasestorage.app",
  messagingSenderId: "716570259090",
  appId: "1:716570259090:web:71110207cea2097d76404b",
  measurementId: "G-1ZPD217RQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.language = 'en'
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById('google-login-btn');

if (googleLogin) {
    googleLogin.addEventListener("click", function(){
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            window.location.href = "Dashboard.html"
        }).catch((error) => {
            // Handle Errors here.
        });
    })
}

export { app, auth };