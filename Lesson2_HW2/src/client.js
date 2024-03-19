async function fetchFiles() {
    const response = await fetch('/api/files');
    const files = await response.json();
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = `${file.name}: ${file.description}`;
        filesList.appendChild(li);
    });
}

async function addFile(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newFile = {};
    formData.forEach((value, key) => {
        newFile[key] = value;
    });
    const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFile)
    });
    if (response.ok) {
        fetchFiles();
        form.reset();
    }
}

document.getElementById('addFileForm').addEventListener('submit', addFile);
fetchFiles();
