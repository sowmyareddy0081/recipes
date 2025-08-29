const toggleIngredientsBtn = document.getElementById("toggleIngredients");
const ingredientsList = document.querySelector(".ingredients");

const toggleStepsBtn = document.getElementById("toggleSteps");
const stepsList = document.querySelector(".steps");

const startCookingBtn = document.getElementById("startCooking");
const nextStepBtn = document.getElementById("nextStep");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const timerDisplay = document.getElementById("timer");
const printBtn = document.getElementById("printRecipe");

let currentStep = 0;
let timer;
let totalTime = 45 * 60; // 45 minutes in seconds

toggleIngredientsBtn.addEventListener("click", () => {
    ingredientsList.classList.toggle("hidden");
    toggleIngredientsBtn.textContent = ingredientsList.classList.contains("hidden") ? "Show Ingredients" : "Hide Ingredients";
});

toggleStepsBtn.addEventListener("click", () => {
    stepsList.classList.toggle("hidden");
    toggleStepsBtn.textContent = stepsList.classList.contains("hidden") ? "Show Steps" : "Hide Steps";
});

startCookingBtn.addEventListener("click", () => {
    currentStep = 0;
    highlightStep();
    nextStepBtn.disabled = false;
    progressContainer.classList.remove("hidden");
    startTimer();
});

nextStepBtn.addEventListener("click", () => {
    currentStep++;
    highlightStep();
});

function highlightStep() {
    const steps = document.querySelectorAll(".steps li");
    steps.forEach((step, index) => {
        step.style.background = index === currentStep ? "#ffe0b2" : "transparent";
    });
    progressBar.style.width = ((currentStep + 1) / steps.length) * 100 + "%";
    
    if (currentStep >= steps.length - 1) {
        nextStepBtn.disabled = true;
    }
}

function startTimer() {
    clearInterval(timer);
    let timeLeft = totalTime;
    timer = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `⏱ Time Remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timeLeft <= 0) clearInterval(timer);
        timeLeft--;
    }, 1000);
}

printBtn.addEventListener("click", () => {
    window.print();
});
