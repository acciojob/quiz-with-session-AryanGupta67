const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which one is a frontend framework?",
    choices: ["Node.js", "Django", "React", "MongoDB"],
    answer: "React"
  },
  {
    question: "Which HTML tag is used to display an image?",
    choices: ["<img>", "<image>", "<src>", "<pic>"],
    answer: "<img>"
  }
];

// Get HTML elements
const questionContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load previous answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionContainer.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const div = document.createElement("div");

    // Question text
    const p = document.createElement("p");
    p.textContent = `${qIndex + 1}. ${q.question}`;
    div.appendChild(p);

    // Options
    q.choices.forEach((choice, cIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${qIndex}`;
      input.value = choice;

      // Check previously selected answer
      if (userAnswers[`q${qIndex}`] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // for Cypress
      }

      // Store answer on change
      input.addEventListener("change", () => {
        userAnswers[`q${qIndex}`] = input.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.append(` ${choice}`);
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    questionContainer.appendChild(div);
  });
}

// Handle submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[`q${i}`] === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of 5.`;
  scoreDiv.textContent = scoreText;

  localStorage.setItem("score", score.toString());
});

// Display stored score if present
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}

// Render everything
renderQuestions();


