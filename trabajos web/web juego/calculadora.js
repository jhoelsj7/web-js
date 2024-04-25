let historyStack = [];
let currentExpression = '';

function inputDigit(digit) {
    currentExpression += digit;
    updateDisplay();
}

function performOperation(operator) {
    if (['+', '-', '*', '/', '%', '**'].includes(currentExpression.slice(-1))) {
        return;
    }
    currentExpression += ` ${operator} `;
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentExpression.replace(/π/g, 'Math.PI').replace(/√/g, 'Math.sqrt');
        const result = eval(expression);
        historyStack.push(currentExpression + ' = ' + result);
        currentExpression = result.toString();
        updateDisplay();
        updateHistory();
    } catch (error) {
        currentExpression = 'Error';
        updateDisplay();
        setTimeout(clearHistory, 2000); // Clear after showing error for 2 seconds
    }
}

function clearHistory() {
    currentExpression = '';
    historyStack = [];
    updateDisplay();
    updateHistory();
}

function undo() {
    if (historyStack.length > 0) {
        currentExpression = historyStack.pop().split(' = ')[0];
        updateDisplay();
        updateHistory();
    }
}

function backspace() {
    if (currentExpression.endsWith(' ')) {
        currentExpression = currentExpression.slice(0, -3);
    } else {
        currentExpression = currentExpression.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('currentInput').value = currentExpression;
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = ''; // Clear previous history entries
    historyStack.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.textContent = entry;
        entryElement.className = 'history-entry'; // Add a class for styling
        entryElement.onclick = function() {
            loadHistory(index);
        };
        historyElement.appendChild(entryElement);
    });
}

function loadHistory(index) {
    const entry = historyStack[index];
    currentExpression = entry.split(' = ')[0]; // Load only the operation, not the result
    updateDisplay();
}

window.onload = function() {
    updateDisplay();
    updateHistory();
};

function inputSquare() {
    currentExpression += '**2';
    updateDisplay();
}

function inputSquareRoot() {
    if (currentExpression.length === 0 || isNaN(currentExpression[currentExpression.length - 1])) {
        currentExpression += 'Math.sqrt(';
    } else {
        currentExpression += ' * Math.sqrt(';
    }
    updateDisplay();
}

function inputPi() {
    currentExpression += 'Math.PI';
    updateDisplay();
}
