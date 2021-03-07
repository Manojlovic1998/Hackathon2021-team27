const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const patrickIcon = document.getElementById('patrick-icon');
const homeButton = document.getElementById('home-button');

// Checks if clicked button is the correct answer
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

// Resets the scores
resetScore = () => {
    localStorage.setItem('shamrocks', '0');
}
patrickIcon.addEventListener('click', resetScore);
homeButton.addEventListener('click', resetScore);
