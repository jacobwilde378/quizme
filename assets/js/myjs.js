var questionBank = [
    {Q:"Inside of which HTML element do we put the JavaScript?", A:2, O1:"<scripting>", O2:"<script>", O3:"<javascript>", O4:"<js>"},
    {Q:"Where is the correct HTML section to add the Script Element?", A:1, O1:"The <body> section", O2:"The <head> section", O3:"The <header> section", O4:"None of the above"},
    {Q:"What is the correct syntax for referring to an external script called 'xxx.js'", A:4, O1:'<a href="xxx.js">', O2:'script href="xxx.js"', O3:'<script name="xxx.js"', O4:'<script src="xxx.js"'},
    {Q:'How do you write "Hello World" in an alert box?', A:3, O1:'msgBox("Hellow World");', O2:'alertBox("Hello World");', O3:'alert("Hello World");', O4:'msg("Hello World");'},
    {Q:'How do you create a function in JavaScript?', A:2, O1:'function:myFunction()', O2:'function = myFunction()', O3:'function myFunction()', O4:'None of the above'},
];
var mainContentEl = document.querySelector("#main-content")
var h1ContentEl = document.querySelector("#this-content")
var pContentEl = document.querySelector("#description")
var p2ContentEl = document.querySelector("#description2")

var systemStartup = function() {
    
    h1ContentEl.textContent = "Java Coding Quiz Challenge"
    pContentEl.textContent = "Try to answer the following code-related questions within the time limit."
    p2ContentEl.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

    var button = document.createElement('BUTTON');
    var buttonText = document.createTextNode("Start Quiz")
    button.id = 'startButton'

    button.appendChild(buttonText);

    mainContentEl.appendChild(button);
}
var startQuiz = function () {
    h1ContentEl.textContent = "Jahhhhhhhhhhh"
}

systemStartup();

document.getElementById("startButton").addEventListener("click", function(){
    startQuiz();
});



