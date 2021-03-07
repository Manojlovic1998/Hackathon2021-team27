const correctNext = document.getElementById('correct-next');
const score = document.getElementById('score');

// Points logic
addShamrocks = () => {
    if (localStorage.getItem('shamrocks') == null) {
        localStorage.setItem('shamrocks', '0');
    } else {
        let shamrocks = Number(localStorage.getItem('shamrocks'));
        shamrocks++
        localStorage.setItem('shamrocks', shamrocks);
    }
}

correctNext.addEventListener('click', addShamrocks);
