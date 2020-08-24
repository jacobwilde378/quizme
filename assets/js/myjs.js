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
    correctEl.id = "numCorrect"
    mainContentEl.appendChild(correctEl);

    var incorrectEl = document.createElement('h2');
    var incorrectElText = document.createTextNode("Incorrect Answers:  " + incorrectAnswers);
    incorrectEl.appendChild(incorrectElText);
    incorrectEl.id = "numIncorrect"
    mainContentEl.appendChild(incorrectEl);

    var finalScreen = function () {
        document.getElementById("h2-final-score").remove();
        document.getElementById("user-data").remove();
        document.getElementById("submit-button").remove();
        
        var name1El = document.createElement('h2');
        name1El.id = 'content-1'
        name1El.textContent = "1.  " + localStorage.getItem("name1") + " - " + localStorage.getItem("score1")
        mainContentEl.appendChild(name1El)


        var name2El = document.createElement('h2');
        name2El.id = 'content-2'
        name2El.textContent = "2.  " + localStorage.getItem("name2") + " - " + localStorage.getItem("score2")
        mainContentEl.appendChild(name2El)

        var name3El = document.createElement('h2');
        name3El.id = 'content-3'
        name3El.textContent = "3.  " + localStorage.getItem("name3") + " - " + localStorage.getItem("score3")
        mainContentEl.appendChild(name3El)
        
        var clearScores = document.createElement('button');
        clearScores.id = 'clear-high-scores'
        clearScores.textContent = "Clear High Scores"
        mainContentEl.appendChild(clearScores)

        var tryAgain = document.createElement('button');
        tryAgain.id = "try-again"
        tryAgain.textContent = "Take Test Again"
        mainContentEl.appendChild(tryAgain)

        document.getElementById('clear-high-scores').addEventListener('click', function() {
            localStorage.setItem('name1', "")
            localStorage.setItem('name2', "")
            localStorage.setItem('name3', "")

            localStorage.setItem('score1', "0")
            localStorage.setItem('score2', "0")
            localStorage.setItem('score3', "0")


            document.getElementById("content-1").remove();
            document.getElementById("content-2").remove();
            document.getElementById("content-3").remove();
            document.getElementById("clear-high-scores").remove();
            document.getElementById("try-again").remove();
            window.location.reload(false)
        })

        document.getElementById('try-again').addEventListener('click', function() {
            window.location.reload(false)
        })
    }

    var buildForm = function (correctAnswers) {
        var name1 = localStorage.getItem("name1");
        var name2 = localStorage.getItem("name2");
        var name3 = localStorage.getItem("name3");
        var score1 = localStorage.getItem("score1");
        var score2 = localStorage.getItem("score2");
        var score3 = localStorage.getItem("score3")


        var inputName = document.createElement('input')
        inputName.id = "user-data"
        inputName.type = "text";
        inputName.name = "Name-Input";
        inputName.placeholder = "Please Enter Your Initials!"
        mainContentEl.appendChild(inputName)

        var inputCommit = document.createElement('button');
        inputCommit.id = "submit-button";
        inputCommit.textContent = "Submit";
        mainContentEl.appendChild(inputCommit)

        document.getElementById("submit-button").addEventListener('click', function () {
            var userInput = document.getElementById("user-data").value;
            if (correctAnswers > score1) {
                localStorage.setItem("name1", userInput)
                localStorage.setItem("name2", name1)
                localStorage.setItem("name3", name2)
                localStorage.setItem("score1", correctAnswers)
                localStorage.setItem("score2", score1)
                localStorage.setItem("score3", score2)
            }
            else if (correctAnswers > score2) {
                localStorage.setItem("name2", userInput)
                localStorage.setItem("score2", correctAnswers)
                localStorage.setItem("name3", name2)
                localStorage.setItem("score3", score2)

            }
            else if (correctAnswers > score3) {
                localStorage.setItem("name3", userInput)
                localStorage.setItem("score3", correctAnswers)

            }
            finalScreen();
        })

    }

    var buttonHiEl = document.createElement('button');
    buttonHiEl.id = "high-score"
    var buttonHiElText = document.createTextNode("View High Score");
    buttonHiEl.appendChild(buttonHiElText);
    mainContentEl.appendChild(buttonHiEl);

    document.getElementById("high-score").addEventListener('click', function () {
        buttonHiEl.remove();
        h1ContentEl.textContent = "All Done!";
        document.getElementById("numCorrect").remove();
        document.getElementById("numIncorrect").remove();
        var resultScore = document.createElement('h2');
        resultScore.id = "h2-final-score"
        resultScore.textContent = "Your final score is " + correctAnswers + "/" + questionBank.length;
        mainContentEl.appendChild(resultScore);
        buildForm(correctAnswers);
    })
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
            if (document.getElementById("0")) {
                document.getElementById("0").remove()
                document.getElementById("1").remove()
                document.getElementById("2").remove()
                document.getElementById("3").remove()
            }
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

document.getElementById("scores").addEventListener("click", function() {
    displayResults();
})

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