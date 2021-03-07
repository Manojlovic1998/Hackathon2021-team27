// Displays the total points
const finalScore = document.createElement('h2');
document.body.appendChild(finalScore);
finalScore.innerHTML = `
    <h2>Your Final Score: ${localStorage.getItem('shamrocks')}<h2>
`;

// Resets the points
const backHome = document.getElementById('back-home');
backHome.addEventListener('click', () => {
    localStorage.setItem('shamrocks', '0');
});