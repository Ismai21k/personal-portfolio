// Import necessary Firebase SDKs for app initialization, authentication, and database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration object containing project-specific details
const firebaseConfig = {
    apiKey: "Use your API", // API key for Firebase authentication
    authDomain: "personal-portfolio-b83d3.firebaseapp.com", // Firebase project domain
    databaseURL: "https://personal-portfolio-b83d3-default-rtdb.firebaseio.com", // Realtime Database URL
    projectId: "personal-portfolio-b83d3", // Firebase project ID
    storageBucket: "personal-portfolio-b83d3.appspot.com", // Storage bucket URL
    messagingSenderId: "491800179588", // Messaging sender ID for Firebase Cloud Messaging
    appId: "1:491800179588:web:c52a73fe83f8aad4b4e3d1", // Firebase app ID
    measurementId: "G-LP4Q3V6BW7" // Google Analytics measurement ID
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);

// Get Firebase authentication and database instances
const auth = getAuth();
const db = getDatabase(app);

// DOM element references for login, dashboard, and messages
const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('admin-dashboard');
const loginBtn = document.getElementById('admin-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('admin-email');
const passwordInput = document.getElementById('admin-password');
const messagesContainer = document.getElementById('admin-messages');

// Event listener for the login button: triggers Firebase authentication with email and password
loginBtn.addEventListener('click', () => {
  const email = emailInput.value; // Get email from input field
  const password = passwordInput.value; // Get password from input field

  // Attempt to sign in with Firebase Auth
  signInWithEmailAndPassword(auth, email, password)
    .then(() => console.log("Logged in")) // Success: log message
    .catch(error => alert("Login failed: " + error.message)); // Error: show alert message
});

// Event listener for the logout button: triggers Firebase sign-out
logoutBtn.addEventListener('click', () => {
  signOut(auth); // Log the user out
});

// Monitor authentication state changes: show login screen if not authenticated, show dashboard if authenticated
onAuthStateChanged(auth, user => {
  if (user) {
    loginSection.style.display = 'none'; // Hide login section
    dashboard.style.display = 'block'; // Show admin dashboard
    loadMessages(); // Load messages from the database
  } else {
    loginSection.style.display = 'block'; // Show login section
    dashboard.style.display = 'none'; // Hide admin dashboard
  }
});

// Function to load messages from Firebase Realtime Database and display them in the admin dashboard
function loadMessages() {
  const contactRef = ref(db, "contacts"); // Reference to 'contacts' node in Realtime Database

  // Fetch the data from the 'contacts' node
  onValue(contactRef, snapshot => {
    messagesContainer.innerHTML = ""; // Clear the messages container before appending new data

    // Iterate over each child (message) in the snapshot and display it in the dashboard
    snapshot.forEach(child => {
      const msg = child.val(); // Get message data
      const msgElement = document.createElement("div"); // Create a new div for each message
      msgElement.innerHTML = `
        <p><strong>Name:</strong> ${msg.name}</p>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong> ${msg.message}</p>
        <hr>
      `; // Display message details
      messagesContainer.appendChild(msgElement); // Append message to the container
    });
  });
}
