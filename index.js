const user = JSON.parse(localStorage.getItem("loggedInUser"));
        const userStatus = document.getElementById("user-status");
        const navLinks = document.getElementById("nav-links");
    
        if (user) {
          userStatus.textContent = `Welcome, ${user.name}`;
      
          document.getElementById("login-link")?.remove();
          document.getElementById("register-link")?.remove();
      
          const logoutLink = document.createElement("a");
          logoutLink.href = "login.html";
          logoutLink.textContent = "Logout";
          navLinks.appendChild(logoutLink);
      
          if (user.email === "admin@quiz.com") {
            const dashboardLink = document.createElement("a");
            dashboardLink.href = "dashboard.html";
            dashboardLink.textContent = "Dashboard";
            navLinks.appendChild(dashboardLink);
          }
        } else {
          userStatus.textContent = "Welcome, Guest";
        }

        const startButtons = document.querySelectorAll(".start-btn");
        const quizTitles = document.querySelectorAll(".quiz-box .quiz-title");
      
        startButtons.forEach((btn, index) => {
          btn.addEventListener("click", () => {
            const quizName = quizTitles[index].textContent.trim();
      
            if (!user) {
              alert("You must be logged in to start a quiz.");
              return;
            }
      

            user.selectedQuiz = quizName;
            localStorage.setItem("loggedInUser", JSON.stringify(user));
      
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users = users.map(u => u.email === user.email ? user : u);
            localStorage.setItem("users", JSON.stringify(users));
      
            window.location.href = "quiz.html";
          });
        });