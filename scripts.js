let isShiftEnabled = false; // Track shift state

function appendToDisplay(value) {
    const display = document.getElementById('display');
    // If the value is one of the inverse function placeholders,
    // show the fancy text on the display.
    if (value === 'asin(') {
        display.value += "sin⁻¹(";
        return;
    } else if (value === 'acos(') {
        display.value += "cos⁻¹(";
        return;
    } else if (value === 'atan(') {
        display.value += "tan⁻¹(";
        return;
    }
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteOne() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById('display').value;

        // Replace inverse trig notations with their JavaScript Math equivalents.
        // Convert sin⁻¹( to asin(, cos⁻¹( to acos(, and tan⁻¹( to atan(
        expression = expression.replace(/sin⁻¹\(/g, 'asin(');
        expression = expression.replace(/cos⁻¹\(/g, 'acos(');
        expression = expression.replace(/tan⁻¹\(/g, 'atan(');

        // Replace implicit multiplication (e.g., 8(3+9)) with explicit multiplication (e.g., 8*(3+9))
        expression = expression.replace(/(\d+)\(/g, '$1*(');

        // Replace '^' with '**' for exponentiation
        expression = expression.replace(/\^/g, '**');

        // Replace '√' with 'Math.sqrt'
        expression = expression.replace(/√(\d+)/g, 'Math.sqrt($1)');

        // Replace standard trigonometric and logarithmic function calls with Math equivalents.
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');

        // Evaluate the expression
        let result = eval(expression);

        // Display the result
        document.getElementById('display').value = result;
    } catch (error) {
        alert('Invalid Calculation');
    }
}

function toggleShift() {
    isShiftEnabled = !isShiftEnabled;
    updateShiftButtons();
}

function updateShiftButtons() {
    // Select the original trig buttons by their text content (since their onclick is updated later)
    const sinButton = document.querySelector('button[data-func="sin"]');
    const cosButton = document.querySelector('button[data-func="cos"]');
    const tanButton = document.querySelector('button[data-func="tan"]');

    if (isShiftEnabled) {
        sinButton.innerHTML = 'sin<sup>-1</sup>';
        sinButton.setAttribute("onclick", "appendToDisplay('asin(')");
        cosButton.innerHTML = 'cos<sup>-1</sup>';
        cosButton.setAttribute("onclick", "appendToDisplay('acos(')");
        tanButton.innerHTML = 'tan<sup>-1</sup>';
        tanButton.setAttribute("onclick", "appendToDisplay('atan(')");
    } else {
        sinButton.innerHTML = 'sin';
        sinButton.setAttribute("onclick", "appendToDisplay('sin(')");
        cosButton.innerHTML = 'cos';
        cosButton.setAttribute("onclick", "appendToDisplay('cos(')");
        tanButton.innerHTML = 'tan';
        tanButton.setAttribute("onclick", "appendToDisplay('tan(')");
    }
}

function switchFractionDecimal() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    if (!isNaN(value)) {
        if (Number.isInteger(value)) {
            display.value = value.toFixed(2); // Convert integer to decimal
        } else {
            display.value = value;
        }
    }
}
