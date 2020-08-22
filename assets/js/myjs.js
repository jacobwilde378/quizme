var questionBank = [
    {
        Q: "Inside of which HTML element do we put the JavaScript?",
        A: 1,
        O: ["<scripting>", "<script>", "<javascript>", "<js>"]
    },
    {
        Q: "Where is the correct HTML section to add the Script Element?",
        A: 0,
        O: ["The <body> section", "The <head> section", "The <header> section", "None of the above"]
    },
    {
        Q: "What is the correct syntax for referring to an external script called 'xxx.js'",
        A: 3,
        O: ['<a href="xxx.js">', 'script href="xxx.js"', '<script name="xxx.js"', '<script src="xxx.js"']
    },
    {
        Q: 'How do you write "Hello World" in an alert box?',
        A: 2,
        O: ['msgBox("Hello World");', 'alertBox("Hello World");', 'alert("Hello World");', 'msg("Hello World");']
    },
    {
        Q: 'How do you create a function in JavaScript?',
        A: 1,
        O: ['function:myFunction()', 'function = myFunction()', 'function myFunction()', 'None of the above']
    }
];

var currentQuestions = 0
var correctAnswers = 0
var incorrectAnswers = 0
var timeLeft = 60;
var instantGrade = "Good Luck";

var mainContentEl = document.querySelector("#main-content");
var h1ContentEl = document.querySelector("#this-content");
var pContentEl = document.querySelector("#description");
var p2ContentEl = document.querySelector("#description2");
var olEl = document.querySelector("#my-list");
var timerEl = document.querySelector("#time-remaining");
var scoreEl = document.querySelector("#scores");
scoreEl.textContent = "View High Scores";
scoreEl.className = "top-box";

var systemStartup = function () {

    h1ContentEl.textContent = "Java Coding Quiz Challenge"
    pContentEl.textContent = "Try to answer the following code-related questions within the time limit."
    p2ContentEl.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

    var button = document.createElement('BUTTON');
    var buttonText = document.createTextNode("Start Quiz")
    button.id = 'startButton'

    button.appendChild(buttonText);

    mainContentEl.appendChild(button);
}
var displayResults = function () {
    timerEl.textContent = "Time Remaining:  " + 0;
    h1ContentEl.textContent = "Results";

    var correctEl = document.createElement('h2');
    var correctElText = document.createTextNode("Correct Answers:  " + correctAnswers);
    correctEl.appendChild(correctElText);
    mainContentEl.appendChild(correctEl);

    var incorrectEl = document.createElement('h2');
    var incorrectElText = document.createTextNode("Incorrect Answers:  " + incorrectAnswers);
    incorrectEl.appendChild(incorrectElText);
    mainContentEl.appendChild(incorrectEl);
}
var startTimer = function () {
    var timeInterval = setInterval(function () {

        if (timeLeft > 0) {
            timerEl.textContent = "Time Remaining:  " + timeLeft
            timerEl.className = "top-box"
            timeLeft--
        }
        else {
            clearInterval(timeInterval);
            document.getElementById("0").remove()
            document.getElementById("1").remove()
            document.getElementById("2").remove()
            document.getElementById("3").remove()
            displayResults();
        }
    }, 1000);
}
var serveQuestion = function (questionNumber, instantGrade) {

    h1ContentEl.textContent = questionBank[questionNumber].Q;

    for (var i = 0; i < 4; i++) {

        var buttonDefault = document.createElement('button');
        var buttonDefaultText = document.createTextNode((i + 1) + ".  " + questionBank[questionNumber].O[i]);
        buttonDefault.className = "answer-buttons";
        buttonDefault.id = i;
        buttonDefault.appendChild(buttonDefaultText);
        mainContentEl.appendChild(buttonDefault)
    }
    if (questionNumber > 0) {
        instantGrader(instantGrade);
    }

}

var startQuiz = function () {
    startTimer();
    mainContentEl.removeChild(pContentEl)
    mainContentEl.removeChild(p2ContentEl)
    serveQuestion(currentQuestions);
}

systemStartup();

document.getElementById("startButton").addEventListener("click", function () {

    document.getElementById("startButton").remove()
    startQuiz();
});
var instantGrader = function (instantGrade) {
    instantGradeEl = document.createElement('p');
    instantGradeEl.id = "grader"
    if (instantGrade === "Correct!" || instantGrade === "Incorrect!") {
        var instantGradeElText = document.createTextNode(instantGrade);
        instantGradeEl.appendChild(instantGradeElText);
        mainContentEl.appendChild(instantGradeEl)
    }
}

document.addEventListener('click', function (e) {
    if (e.target.className === "answer-buttons") {
        var userAnswer = (parseInt(e.target.id));
        if (userAnswer === questionBank[currentQuestions].A) {
            correctAnswers++
            instantGrade = "Correct!";
        }
        else {
            incorrectAnswers++
            instantGrade = "Incorrect!";
            timeLeft -= 10
        }
        document.getElementById("0").remove()
        document.getElementById("1").remove()
        document.getElementById("2").remove()
        document.getElementById("3").remove()

        currentQuestions++

        var elementName = document.getElementById("grader")
        if (elementName !== null) {
            elementName.remove()
        }

        if (parseInt(currentQuestions) == parseInt(questionBank.length)) {
            timeLeft = 0
        }
        else {
            serveQuestion(currentQuestions, instantGrade);
        }

    }
})