const answerDiv = document.getElementById('answers');
let confirmation = document.createElement('div');

// Checks if answer is correct from the clicked button
checkAnswer = (answer) => {
    if (answer == myVar) {
        confirmation.innerHTML = `
        <div class="row">
            <div class="col-12">
                <h4 class="text-white font-italic mb-2">CORRECT! Congratulations, you have won 1 Shamrock to use in Paddy’s Pub.</h4>
                <button class="text-center btn orange-background text-white w-75 mb-2">Next question</button>
            </div>
        </div>`;
        answerDiv.appendChild(confirmation);
    } else {
        confirmation.innerHTML = `
        <div class="row">
            <div class="col-12">
                <h4 class="text-white font-italic mb-2">Incorrect! I’m sorry but you have missed out on 1 Shamrock.</h4>
                <button class="text-center btn orange-background text-white w-75 mb-2">Next question</button>
            </div>
        </div>`;
        answerDiv.appendChild(confirmation);
    }
    
}

let allButtons = Array.from(document.querySelectorAll('button'));
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        let answer = button.innerText;
        checkAnswer(answer);
    })
})
