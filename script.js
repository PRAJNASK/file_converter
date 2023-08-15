const fileInput = document.getElementById('file-input');
const formatSelect = document.getElementById('format-select');
const convertBtn = document.getElementById('convert-btn');
const downloadLink = document.getElementById('download-link');

convertBtn.addEventListener('click', convertFile);

function convertFile() {
    const selectedFormat = formatSelect.value;
    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const fileContent = event.target.result;
        const convertedContent = convertToFormat(selectedFormat, fileContent);
        downloadLink.href = createDownloadURL(convertedContent, selectedFormat);
        downloadLink.download = `converted.${selectedFormat}`;
        downloadLink.style.display = 'block';
    };

    reader.readAsText(selectedFile);
}

function convertToFormat(format, content) {
    switch (format) {
        case 'csv':
            return content.replace(/\s+/g, ',');
        case 'json':
            return JSON.stringify(content);
        case 'txt':
        default:
            return content;
    }
}

function createDownloadURL(content, format) {
    const blob = new Blob([content], { type: `text/${format}` });
    return URL.createObjectURL(blob);
}
