const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "London"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What is the result of 2 + 2?",
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
    choices: ["<img>", "<src>", "<image>", "<pic>"],
    answer: "<img>"
  }
];

const questionContainer = document.getElementById("questions");
const scoreContainer = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Try to load saved progress
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render all questions
function renderQuestions() {
  questionContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = `${index + 1}. ${q.question}`;
    wrapper.appendChild(title);

    q.choices.forEach(choice => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Restore previous selection
      if (savedProgress[`question-${index}`] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // for Cypress
      }

      input.addEventListener("change", () => {
        savedProgress[`question-${index}`] = input.value;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(input);
      label.append(` ${choice}`);
      wrapper.appendChild(label);
      wrapper.appendChild(document.createElement("br"));
    });

    questionContainer.appendChild(wrapper);
  });
}

// Score display on load if already submitted
if (localStorage.getItem("score") !== null) {
  scoreContainer.textContent = `Your score is ${localStorage.getItem("score")} out of 5.`;
}

// Submit quiz
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    const answer = savedProgress[`question-${index}`];
    if (answer === q.answer) {
      score++;
    }
  });

  scoreContainer.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// Initial render
renderQuestions();

