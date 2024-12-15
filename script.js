// Save and Load Data Using Local Storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Upload Resources
function uploadResource() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const resources = loadData('resources') || [];
        resources.push({ name: file.name, url: URL.createObjectURL(file) });
        saveData('resources', resources);

        updateResourcesDisplay();
    }
}

// Display Resources
function updateResourcesDisplay() {
    const resources = loadData('resources');
    resourceList.innerHTML = '';
    resources.forEach(resource => {
        const listItem = document.createElement('li');
        const downloadLink = document.createElement('a');
        downloadLink.textContent = resource.name;
        downloadLink.href = resource.url;
        downloadLink.download = resource.name;
        listItem.appendChild(downloadLink);
        resourceList.appendChild(listItem);
    });
}

// Add Question
function addQuestion() {
    const questionInput = document.getElementById('new-question');
    if (questionInput.value.trim() !== "") {
        const questions = loadData('questions') || [];
        questions.push({ text: questionInput.value });
        saveData('questions', questions);

        updateQuestionsDisplay();
        questionInput.value = '';
    }
}

// Display Questions
function updateQuestionsDisplay() {
    const questions = loadData('questions');
    questionsDiv.innerHTML = '';
    questions.forEach(question => {
        const questionThread = document.createElement('div');
        questionThread.classList.add('question');
        const questionText = document.createElement('p');
        questionText.textContent = `Q: ${question.text}`;
        questionThread.appendChild(questionText);
        questionsDiv.appendChild(questionThread);
    });
}
