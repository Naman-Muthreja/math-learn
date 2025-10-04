
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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

// Auth
const auth = getAuth(app);
auth.language = 'en';
const provider = new GoogleAuthProvider();

// Database
const db = getDatabase(app);

// Login button handler (if on index.html)
const googleLogin = document.getElementById('google-login-btn');
if (googleLogin) {
  googleLogin.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "Dashboard.html";
      // Grab whatever the current login date was before overwriting
      let lastLoginDate = localStorage.getItem("currentLoginDate");

      // If there was a previous login, store it as "lastLoginDate"
      if (lastLoginDate) {
        localStorage.setItem("lastLoginDate", lastLoginDate);
      }

      localStorage.setItem("currentLoginDate", new Date());


    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("username", user.displayName);
        localStorage.setItem("email", user.email);
    }
})



export { app, auth, db };