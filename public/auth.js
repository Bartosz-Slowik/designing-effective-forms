
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsy0u4R6TFgvjvocymF3mhfj9vIEn7oRU",
    authDomain: "slowik-link.firebaseapp.com",
    projectId: "slowik-link",
    storageBucket: "slowik-link.appspot.com",
    messagingSenderId: "963852711518",
    appId: "1:963852711518:web:596d180d17fdb0188b66cf",
    measurementId: "G-YWF8CR24Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Wyświetl komunikat o błędzie
        alert(`Login failed: ${errorMessage}`);
    });
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!");
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Wyświetl komunikat o błędzie
        alert(`Sign out failed: ${errorMessage}`);
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, so change the button to show the Google avatar and user's name
        const userPhotoURL = user.photoURL; // URL of the user's profile picture
        const userName = user.displayName; // User's display name
        const signInButton = document.getElementById('signInButton');
        signInButton.style.padding = "3px"; // Remove padding from the button
        signInButton.innerHTML = `<img src="${userPhotoURL}" alt="Google Avatar" style="height: 30px; width: 30px; border-radius: 50%; margin: 0;"> ${userName}`;
// Optionally disable the button
        signOutButton.style.display = 'inline-block'; // Make sign-out button visible

        // Example of storing the user's token in localStorage
        user.getIdToken().then((token) => {
            localStorage.setItem('userToken', token);
        });

        // Example of injecting user data into the form
        document.getElementById('firstName').value = user.displayName.split(' ')[0]; // Assuming first and last name are separated by a space
        document.getElementById('lastName').value = user.displayName.split(' ')[1]; // Assuming first and last name are separated by a space
        
        document.getElementById('exampleInputEmail1').value = user.email;
    } else {
        const signInButton = document.getElementById('signInButton');
        signInButton.innerHTML = 'Login with Google';
        signInButton.style.backgroundColor = '#db4437'; // Google red
        signInButton.style.color = 'white';
        signInButton.style.border = 'none';
        signInButton.style.padding = '10px 20px';
        signInButton.style.borderRadius = '2px';
        signInButton.style.fontSize = '15px';
        signInButton.style.fontWeight = 'bold';
        signInButton.style.textAlign = 'center';
        signInButton.style.cursor = 'pointer';
        signInButton.style.borderRadius = '20px'; // Make the button rounded

        signInButton.disabled = false; // Re-enable the button if it was previously disabled
        
        signOutButton.style.display = 'none'; // Make sign-out button invisible

        console.log("User is signed out");
    }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
