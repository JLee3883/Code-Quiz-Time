let timeEl = document.querySelector("p.time");
let secondsLeft = 60;
let scoreEl = document.querySelector("#score");

const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;

const highscoresEl = document.querySelector("#highscores");
const startBtn = document.querySelector("#start");
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
const ansBtn = document.querySelectorAll("button.ansBtn")

const questions = [
    {
    question: "Commonly used data types do not include:",
    answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    correctAnswer: "2"
    },
    {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
    correctAnswer: "1"
    },
    {
    question: "Arrays in Javascript can be used to store ____.",
    answers: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
    correctAnswer: "3"
    },
    {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. Commmas", "2. Curly brackets", "3. Quotes", "4. Parentheses"],
    correctAnswer: "2"
    },
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["1. Javascript", "2. Terminal", "3. For loops", "4. Console.log"],
    correctAnswer: "3"
    }
];

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time: ${secondsLeft}s`;
        
        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}