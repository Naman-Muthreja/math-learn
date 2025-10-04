import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { app, auth } from "./firebase.js";
import { doc, setDoc, getDoc, updateDoc, increment, arrayUnion, collection, addDoc} from 'firebase/firestore';
import {auth, db} from './firebase-config';
export const initializeUserProgress = async (user) => { 
        const progressRef = doc(db, 'userProgress', user.uid); 
        const progressDoc = await getDoc(progressRef); 
        if (!progressDoc.exists()) { await setDoc(progressRef, { 
        uid:user.displayName,
        QuizCompletion: 0,
        lastLoginDate: new Date(),
        notifications:false,
        totalTimeSpent: 0,
        });  
    } else {
        await updateDoc(progressRef, {
            lastLoginDate: new Date(),
        });
    }
};


function updateUserProfile(user){
    const nameElement = document.getElementById("user-name");
    const emailElement = document.getElementById("user-email");
    const imgElement = document.getElementById("user-profile-picture");

    if (nameElement)  nameElement.textContent = user.displayName || "(no name)";
    if (emailElement) emailElement.textContent = user.email || "";
    if (imgElement) {
        imgElement.alt = user.displayName || "Profile photo";
        if (user.photoURL) {
            imgElement.src = user.photoURL;
        } else {
            imgElement.removeAttribute("src"); // no image available
        }
    }
}
const userProgressStructure={
    uid:user.displayName,
    QuizCompletion: null,
    streakCount: null,
    notifications:false,
    totalTimeSpent: null,
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        localStorage.setItem("username", user.displayName);
        localStorage.setItem("email", user.email);
        return uid;
    }
})

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            // After signing out, send them back to login
            window.location.href = "../index.html";
        } catch (err) {
            console.error("Error signing out:", err);
            alert("Failed to sign out. Try again.");
        }
    });
}