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
//assinging variables and giving default values
var questionIndex = 0;
var score = 0;
var startButton = document.querySelector('#start-button')
var remainingTime = document.querySelector('#timer');
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 20;
var questionIndex = 0;
var ulCreate = document.createElement("ul");

//click event that starts the timer and runs the startQuiz function
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

//function that uses the gif questions to populate the questionsDiv and creates an ul/li to populate answers
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
//function determining if the answers chosen are the correct ones, giving a notification, and assigning a penalty if the answer is incorrect.
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
        complete();
        createDiv.textContent = "End of quiz! " + "You answered  " + score + "/" + questions.length + " Correct!";
    } else {
        startQuiz(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

//function that renders the final results and changes the page of the quiz. css elements get added/styled in order for the user to see the 
function complete() {
    questionsDiv.innerHTML = "";
    remainingTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Complete!"

    questionsDiv.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);


    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }


    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";

    questionsDiv.appendChild(createLabel);


    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.setAttribute("style", "background-color:var(--navy-blue); color:var(--text-color);cursor: pointer;margin:5px;padding: 3px 10px 3px 10px;");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

// stores the scores locally and redirects to the highscore page, showing the previous scores.
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {


        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./highscore.html");
        }
    });

}