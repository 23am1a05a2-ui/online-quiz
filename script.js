const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: ["Shark", "Blue whale", "Elephant", "Giraffe"],
        correct: 1
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: ["Asia", "Australia", "Arctic", "Africa"],
        correct: 1
    },
    {
        question: "Which is the largest desert in the world?",
        answers: ["Kalahari", "Gobi", "Sahara", "Antarctica"],
        correct: 3
    },
    {
        question: "Which is the smallest country in the world?",
        answers: ["Vatican City", "Bhutan", "Nepal", "Sri Lanka"],
        correct: 0
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;
let selectedIndex = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
    selectedIndex = null;

    const q = questions[currentQuestionIndex];
    questionElement.innerHTML = q.question;
    progress.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const labels = ["A", "B", "C", "D"];

    q.answers.forEach((text, index) => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = `${labels[index]}. ${text}`;
        button.addEventListener("click", () => selectAnswer(button, index));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(button, index) {
    Array.from(answerButtons.children).forEach(btn =>
        btn.classList.remove("selected")
    );

    button.classList.add("selected");
    selectedIndex = index;
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    progress.innerHTML = "";
    answerButtons.innerHTML = "";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

startQuiz();
