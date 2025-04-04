// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG85bCBR4Vf3CkOwgsklq6GKA3CeMlJJg",
  authDomain: "personal-portfolio-b83d3.firebaseapp.com",
  databaseURL: "https://personal-portfolio-b83d3-default-rtdb.firebaseio.com",
  projectId: "personal-portfolio-b83d3",
  storageBucket: "personal-portfolio-b83d3.appspot.com",
  messagingSenderId: "491800179588",
  appId: "1:491800179588:web:c52a73fe83f8aad4b4e3d1",
  measurementId: "G-LP4Q3V6BW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      push(ref(database, 'contacts/'), {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      }).then(() => {
        alert("Message sent successfully!");
        form.reset();
      }).catch(error => {
        console.error("Error sending message:", error);
      });
    });
  }
});
