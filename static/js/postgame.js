// Displays the total points
const finalScore = document.createElement('h2');
document.body.appendChild(finalScore);

// Checks if user has more points than there are questions or manipulated
// the points through code
if (localStorage.getItem('shamrocks') > 9) {
    localStorage.setItem('shamrocks', 'Cheater!');
    finalScore.innerHTML = `
        <h2>Cheating is not nice! Rank: Cheater!<h2>
        `;
} else {
    if (localStorage.getItem('shamrocks') == "NaN") {
        localStorage.setItem('shamrocks', 'Cheater!');
        finalScore.innerHTML = `
        <h2>Your Final Score: ${localStorage.getItem('shamrocks')}<h2>
        `;
    } else {
        finalScore.innerHTML = `
        <h2>Your Final Score: ${localStorage.getItem('shamrocks')}<h2>
    `;
    }
}

// Resets the points
const backHome = document.getElementById('back-home');
backHome.addEventListener('click', () => {
    localStorage.setItem('shamrocks', '0');
});