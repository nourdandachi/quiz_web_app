// Get logged-in user
let user = JSON.parse(localStorage.getItem("loggedInUser"));
const quizzes = JSON.parse(localStorage.getItem("quizzes"));

if (!user || !user.selectedQuiz || !quizzes) {
  alert("No quiz selected or user not logged in.");
  window.location.href = "index.html";
}

const quizName = user.selectedQuiz;
const currentQuiz = quizzes[quizName];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const quizTitle = document.querySelector(".quiz-title");
const questionNumber = document.querySelector(".question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.querySelector(".answers");
const nextBtn = document.getElementById("next-btn");

// Set quiz title
quizTitle.textContent = quizName;

// Load a question
function loadQuestion() {
  const q = currentQuiz[currentQuestionIndex];
  questionNumber.textContent = currentQuestionIndex + 1;
  questionText.textContent = q.question;

  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.classList.add("answer-option");
    div.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}</span> ${option}`;

    div.addEventListener("click", () => {
      document.querySelectorAll(".answer-option").forEach(opt => opt.classList.remove("selected"));
      div.classList.add("selected");
      div.dataset.index = index;
    });

    optionsContainer.appendChild(div);
  });
}

// On click "Next"
nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(".answer-option.selected");
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const selectedIndex = parseInt(selected.dataset.index);
  if (selectedIndex === currentQuiz[currentQuestionIndex].answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.length) {
    loadQuestion();
  } else {
    // Save result under user's scores
    user.scores = user.scores || {};
    user.scores[quizName] = {
      score: Math.round((score / currentQuiz.length) * 100),
      correct: score
    };
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Update in users array
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem("users", JSON.stringify(users));

    // Go to score page
    window.location.href = "score.html";
  }
});

// Initial load
loadQuestion();
