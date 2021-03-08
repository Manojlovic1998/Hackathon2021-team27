const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const patrickIcon = document.getElementById('patrick-icon');
const homeButton = document.getElementById('home-button');
const questionInnertext = document.querySelector('#question').innerText;

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        print(url)
        if (data) [
            xhr.setRequestHeader('Content-Type', '/answer_check')
        ]

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', '/answer_check'); 

        xhr.onload = () => {
            resolve(xhr.response);
        };

        xhr.send(JSON.stringify(data));
    });
    return promise
};

// const sendData = () => {
    
// };


// Checks if clicked button is the correct answer
let allButtons = Array.from(document.getElementsByClassName('answer-btn'));
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        sendHttpRequest('POST', '/answer_check', {
            "question": questionInnertext,
            "client_answer": button.innerText,
        }).then(responseData => {
            console.log(responseData);
        });

        // if (answer == myVar) {
        //     correct.classList.remove('d-none')
        // } else {
        //     incorrect.classList.remove('d-none')
        // }
        // allButtons.forEach(b => {
        //     b.disabled = true;
        //     button.disabled = false;
        // })
    })
})

// Resets the scores
resetScore = () => {
    localStorage.setItem('shamrocks', '0');
}
patrickIcon.addEventListener('click', resetScore);
homeButton.addEventListener('click', resetScore);
