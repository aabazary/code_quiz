//questions from the gif image
var questions = [{
        title: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "All of the Above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "Terminal / Bash", "For Loops", "Console Log"],
        answer: "Console Log"
    },

];
var questionIndex = 0;
var score = 0;
var startButton = document.querySelector('#start-button')
var remainingTime = document.querySelector('#timer')
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");
var secondsLeft = 1000;
var holdInterval = 0;
var penalty = 100;

var questionIndex = 0;
var ulCreate = document.createElement("ul");

startButton.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            remainingTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                complete();
                remainingTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    startQuiz(questionIndex); 
 
});

function startQuiz(questionIndex) {
    
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
       
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
  
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            score++;
        } else {
            createDiv.textContent = "Incorrect! The correct answer is:  " + questions[questionIndex].answer;
            secondsLeft = secondsLeft - penalty;
        }

    }

    questionIndex++;

    if (questionIndex == questions.length) {
        createDiv.textContent = "End of quiz! " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        startQuiz(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}


function complete() {
}
