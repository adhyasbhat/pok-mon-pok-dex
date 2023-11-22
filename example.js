const questionsArray = [
    'What is your favorite color?',
    'Which countries have you visited?',
    'What are your hobbies?',
    // Add more questions here
];

// Function to create questions from the array
function createQuestions() {
    const questionsDiv = document.getElementById('questions');

    questionsArray.forEach(function (question, index) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
        <span>${question}</span>
        <input type="checkbox" class="checkbox" name="question${index + 1}[]" value="Option 1"> Option 1
        <input type="checkbox" class="checkbox" name="question${index + 1}[]" value="Option 2"> Option 2
      `;
        questionsDiv.appendChild(questionDiv);
    });
}

// Create questions from the array
createQuestions();

// Function to gather selected checkboxes and display result
document.getElementById('submitBtn').addEventListener('click', function () {
    const result = {};

    document.querySelectorAll('.question').forEach(function (questionDiv, index) {
        const question = questionsArray[index];
        const checkboxes = [];

        questionDiv.querySelectorAll('input.checkbox:checked').forEach(function (checkbox) {
            checkboxes.push(checkbox.value);
        });

        checkboxes.forEach(function (value) {
            if (!result[value]) {
                result[value] = [question];
            } else {
                result[value].push(question);
            }
        });
    });

    // Display the result object
    document.getElementById('result').textContent = JSON.stringify(result, null, 2);
});

