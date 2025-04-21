const admin = JSON.parse(sessionStorage.getItem("loggedInUser"));
document.getElementById("admin-welcome").textContent = `Welcome, ${admin?.name || "Admin"}`;

let users = JSON.parse(localStorage.getItem("users")) || [];
const quizzes = ["Intro to CS", "Data Structures", "Algorithms & Analysis"];
const totalQuizzes = quizzes.length;

document.getElementById("total-users").textContent = users.length;
document.getElementById("total-quizzes").textContent = totalQuizzes;

const tbody = document.getElementById("users-table-body");
tbody.innerHTML = "";

let totalScoreSum = 0;
let scoreCount = 0;

users.forEach((user, index) => {
  const tr = document.createElement("tr");
  const scores = user.scores || {};

  const quizScores = quizzes.map(q => {
    if (scores[q]) {
      totalScoreSum += scores[q].score;
      scoreCount++;
      return `${scores[q].score}%`;
    }
    return "-";
  });

  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${user.email}</td>
    <td>${quizScores[0]}</td>
    <td>${quizScores[1]}</td>
    <td>${quizScores[2]}</td>
    <td><button class="delete-btn" data-index="${index}">Delete</button></td>
  `;

  tbody.appendChild(tr);
});

const avgScore = scoreCount ? Math.round(totalScoreSum / scoreCount) : 0;
document.getElementById("average-score").textContent = `${avgScore}%`;

document.querySelectorAll(".delete-btn").forEach(button => {
  button.addEventListener("click", () => {
    const index = parseInt(button.dataset.index);
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  });
});
