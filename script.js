// script.js (replace your current script with this)

// -----------------------------
// QUIZ DATA
// -----------------------------
const quizData = [
  { q: "What is phishing?", choices: ["Malware", "Fake emails to steal data", "Firewall", "Encryption"], a: 1 },
  { q: "Best way to protect accounts?", choices: ["Reused password", "Weak password", "Two-factor authentication", "Security question only"], a: 2 },
  { q: "Ransomware does what?", choices: ["Speeds PC", "Encrypts files and demands money", "Deletes spam", "Fixes viruses"], a: 1 },
  { q: "Strong password should include?", choices: ["123456", "Letters + numbers + symbols", "Name only", "Birthdate"], a: 1 },
  { q: "Social engineering attacks target?", choices: ["Systems only", "Humans", "Networks", "Hardware"], a: 1 }
];

// Keep track of selections separately (so quizData remains pure)
const selections = new Array(quizData.length).fill(null);

// -----------------------------
// RENDER QUIZ
// -----------------------------
function renderQuiz() {
  const quizContainer = document.getElementById("quizContainer");
  if (!quizContainer) return;

  quizContainer.innerHTML = ""; // clear

  quizData.forEach((item, qIndex) => {
    const card = document.createElement("div");
    card.className = "card quiz-question";

    const qTitle = document.createElement("h3");
    qTitle.textContent = `Q${qIndex + 1}: ${item.q}`;
    card.appendChild(qTitle);

    const choicesWrap = document.createElement("div");
    choicesWrap.className = "choices-wrap";

    item.choices.forEach((choiceText, choiceIndex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.textContent = choiceText;

      // store indexes as dataset for later reference
      btn.dataset.qIndex = qIndex;
      btn.dataset.choiceIndex = choiceIndex;

      // click handler for selecting option
      btn.addEventListener("click", () => {
        if (btn.disabled) return; // ignore if disabled after submit

        // update selection state
        selections[qIndex] = choiceIndex;

        // visual: remove 'selected' from all siblings for same question
        const siblings = choicesWrap.querySelectorAll(".option-btn");
        siblings.forEach(s => s.classList.remove("selected"));

        // add selected class to clicked button
        btn.classList.add("selected");
      });

      choicesWrap.appendChild(btn);
    });

    card.appendChild(choicesWrap);
    quizContainer.appendChild(card);
  });
}

// -----------------------------
// SUBMIT QUIZ
// -----------------------------
function submitQuiz() {
  let score = 0;

  // compute score
  quizData.forEach((q, i) => {
    if (selections[i] === q.a) score++;
  });

  // show score
  const scoreEl = document.getElementById("score");
  if (scoreEl) scoreEl.textContent = `Score: ${score} / ${quizData.length}`;

  // feedback alert (optional)
  if (score === quizData.length) {
    alert("Excellent! You know your basics well.");
  } else if (score >= Math.ceil(quizData.length / 2)) {
    alert("Good! Review the topics you missed.");
  } else {
    alert("Needs Improvement. Keep learning!");
  }

  // highlight correct / incorrect and disable all buttons
  document.querySelectorAll(".option-btn").forEach(btn => {
    const qIndex = Number(btn.dataset.qIndex);
    const choiceIndex = Number(btn.dataset.choiceIndex);

    // disable to prevent further changes
    btn.disabled = true;

    if (choiceIndex === quizData[qIndex].a) {
      // correct option -> add correct styling
      btn.classList.add("correct");
      btn.style.background = "#16a34a"; // green
      btn.style.color = "#fff";
    } else if (choiceIndex === selections[qIndex]) {
      // user selected this and it's wrong
      btn.classList.add("wrong");
      btn.style.background = "#dc2626"; // red
      btn.style.color = "#fff";
    } else {
      // other unselected options: neutral style (optional)
      btn.style.opacity = "0.95";
    }
  });
}

// -----------------------------
// THEME TOGGLE (uses 'light-theme' class like your CSS expects)
// -----------------------------
function initThemeToggle() {
  const toggleBtn = document.getElementById("toggleTheme");
  if (!toggleBtn) return;

  // Apply saved theme on load
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light-theme");
    toggleBtn.textContent = "Dark Mode";
  } else {
    // default (dark)
    document.body.classList.remove("light-theme");
    toggleBtn.textContent = "Light Mode";
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    toggleBtn.textContent = isLight ? "Dark Mode" : "Light Mode";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// -----------------------------
// INITIALIZE ON DOM READY
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // render quiz
  renderQuiz();

  // wire submit button
  const submitBtn = document.getElementById("submitQuiz");
  if (submitBtn) submitBtn.addEventListener("click", submitQuiz);

  // init theme toggle (and restore saved theme)
  initThemeToggle();
});
