const MAX_NUMBER = 100;
const answers = new Map();

function showModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function checkAnswers() {
    let correctAnswers = 0;
    let total = 0;
    document.querySelectorAll('#tasks > form > input').forEach(input => {
        console.log(answers.get(input.id));
        console.log(input.value);
        if (input.value == answers.get(input.id)) {
            input.style.background = 'lightgreen';
            correctAnswers++;
        } else {
            input.style.background = 'red'
        }
        total++;
    });
    const div = document.createElement('div');
    div.innerHTML = `${correctAnswers}/${total} верни отговора`
    div.style.textAlign = 'center'
    document.querySelector('#tasks').appendChild(div);
}

function generate() {
    document.querySelector('#buttons').style.display = 'block'
    document.querySelector('#tasks').innerHTML = '';
    answers.clear();
    generateTasks();
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function generateTasks() {
    const selectedOperation = document.querySelector('input[name="operation"]:checked').value;
    const numberOfTasks = document.querySelector('#numberOfTasks').value;
    if (selectedOperation === 'addition') {
        for (let i=1; i <= numberOfTasks; i++) {
            generateAdditionTask(i);
        }
    } else {
        for (let i=1; i <= numberOfTasks; i++) {
            generateSubstractTask(i);
        }
    }
}

function generateAdditionTask(index) {
    const firstNumber = getRandomNumber(MAX_NUMBER - 1);
    const secondNumber = getRandomNumber(MAX_NUMBER - firstNumber);
    generateTask(firstNumber, secondNumber, '+', index);
}

function generateSubstractTask(index) {
    const firstNumber = getRandomNumber(MAX_NUMBER - 1) + 1;
    const secondNumber = getRandomNumber(firstNumber - 1);
    generateTask(firstNumber, secondNumber, '-', index);
}

function generateTask(firstNumber, secondNumber, operation, index) {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'Task' + index;
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.innerText = `${firstNumber} ${operation} ${secondNumber} = `;
    form.appendChild(label);
    form.appendChild(input);
    const tasks = document.querySelector('#tasks');
    tasks.appendChild(form);
    tasks.appendChild(document.createElement('br'));
    answers.set(input.id, getAnswer(firstNumber, secondNumber, operation));
}

function getAnswer(firstNumber, secondNumber, operation) {
    if (operation === '+') {
        return firstNumber + secondNumber;
    } else if (operation === '-') {
        return firstNumber - secondNumber;
    }

    return 0;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}