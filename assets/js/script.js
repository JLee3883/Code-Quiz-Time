//Variables for page elements
let timeEl = document.querySelector("p.time");
let secondsLeft = 60;
let scoreEl = document.querySelector("#score");

const firstEl = document.querySelector("#first");

const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");

let questionCount = 0;

const resultEl = document.querySelector("#result");
const finalEl = document.querySelector("#final");
let nameInput = document.querySelector("#name");

const highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

// Available buttons for beginning, final submit and scores
const startBtn = document.querySelector("#start");
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
const ansBtn = document.querySelectorAll("button.ansBtn")
const submitScrBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const viewScrBtn = document.querySelector("#view-scores");
const clearScrBtn = document.querySelector("#clearscores");

// Objects for questions and answers array
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

// The timer
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

// Starts the quiz with the timer and sets up the questions
function startQuiz() {
    firstEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Function to set question, then takes in a count and displays the next question and multiple choice answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// Function to check the answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    // shows correct or wrong
    resultEl.style.display = "block";
    let p = document.createElement("p");
    resultEl.appendChild(p);

    // Times out at the end of the 60 second timer
    setTimeout(function () {
        p.style.display = 'none';

    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 15;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }

    // Calls setQuestion to bring in the next question when any of the answer buttons are clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = nameInput.value.toUpperCase();
    scoreList.push({ name: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } 
        else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].name}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Add to the local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList",JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Adds score with submit button
submitScrBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    firstEl.style.display = "block";
    secondsLeft = 60;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View or hides the High Scores button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
});