const pointsDisplay = document.getElementById('inner-scoreboard');
let finalShamrocks = localStorage.getItem('shamrocks')

checkScore = () => {
    if (finalShamrocks == 8) {
        pointsDisplay.innerHTML = `
        <h3 id="final-score">Your score is: ${finalShamrocks}</h3>
        <p>Congratulations! You deserved pints with Paddy! Cheers!</p>
        `
        document.getElementById('hero-section').classList.add('background-setup', 'background-pints');
        document.getElementById('scoreboard-wrap').classList.add('opacity');
    } else {
        if (finalShamrocks > 8) {
            pointsDisplay.innerHTML = `
            <h3 id="final-score">Your score is: ${finalShamrocks}</h3>
            <p>There are 8 questions and you have ${finalShamrocks} shamrocks? I think you cheated. This makes St Patrick sad as he must send you back to the beginning.
                Paddy has pints only with people who earn their shamrocks.
            </p>
            <p>No cheating this time!</p>
            `
        } else {
            pointsDisplay.innerHTML = `
            <h3 id="final-score">Your score is: ${finalShamrocks}</h3>
            <p>Congratulations! You almost made it, but to have pints with paddy, you must have 8 shamrocks!</p>
            <p>Better luck next Time</p>
            `
        }
    }
}

checkScore();
