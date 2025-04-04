document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check for saved user preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save user preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;

            if (details.style.display === "none" || details.style.display === "") {
                details.style.display = "block";
                button.textContent = "Hide Details";
            } else {
                details.style.display = "none";
                button.textContent = "View Project";
            }
        });
    });
});

 