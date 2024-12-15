const resourceList = document.getElementById('resource-list');
const questionsDiv = document.getElementById('questions');
const resourceCount = document.getElementById('resource-count');
const questionCount = document.getElementById('question-count');
const progressBar = document.getElementById('progress-bar');

let uploadedResources = 0;
let postedQuestions = 0;

// Function to show specific sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Upload Resources with Download Link
function uploadResource() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const listItem = document.createElement('li');
        const downloadLink = document.createElement('a');

        downloadLink.textContent = file.name;
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;

        listItem.appendChild(downloadLink);
        resourceList.appendChild(listItem);

        uploadedResources++;
        updateProgress();
    } else {
        alert("Please select a file!");
    }
}

// Add Questions and Responses
function addQuestion() {
    const questionInput = document.getElementById('new-question');
    if (questionInput.value.trim() !== "") {
        const questionThread = document.createElement('div');
        const questionText = document.createElement('p');
        questionText.textContent = `Q: ${questionInput.value}`;

        const answerInput = document.createElement('input');
        answerInput.placeholder = "Type your answer here...";

        const answerButton = document.createElement('button');
        answerButton.textContent = "Post Answer";
        answerButton.onclick = () => {
            const answerText = document.createElement('p');
            answerText.textContent = `A: ${answerInput.value}`;
            questionThread.appendChild(answerText);
            answerInput.remove();
            answerButton.remove();
        };

        questionThread.appendChild(questionText);
        questionThread.appendChild(answerInput);
        questionThread.appendChild(answerButton);
        questionsDiv.appendChild(questionThread);

        postedQuestions++;
        updateProgress();
        questionInput.value = "";
    } else {
        alert("Please enter a question!");
    }
}

// Update Progress
function updateProgress() {
    resourceCount.textContent = uploadedResources;
    questionCount.textContent = postedQuestions;
    const totalProgress = uploadedResources + postedQuestions;
    progressBar.value = totalProgress;
}
