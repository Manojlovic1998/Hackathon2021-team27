const answerDiv = document.getElementById('answers');
let correct = document.getElementById('correct');
let incorrect = document.getElementById('incorrect');

// Checks if answer is correct from the clicked button
checkAnswer = (answer) => {
    if (answer == myVar) {
        correct.classList.remove('d-none')
    } else {
        incorrect.classList.remove('d-none')
    }
    
}

let allButtons = Array.from(document.getElementsByClassName('answer-btn'));
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        let answer = button.innerText;

        if (answer == myVar) {
            correct.classList.remove('d-none')
        } else {
            incorrect.classList.remove('d-none')
        }
        allButtons.forEach(b => {
            b.disabled = true;
            button.disabled = false;
        })
    })
})
