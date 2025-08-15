let pages = JSON.parse(localStorage.getItem('pages')) || [];
let mediaRecorder;
let audioChunks = [];
let audioBlobUrl = '';

document.getElementById('addPhotosBtn').addEventListener('click', addPhotos);
document.getElementById('createPageBtn').addEventListener('click', createPage);
document.getElementById('viewPagesBtn').addEventListener('click', viewAllPages);
document.getElementById('recordAudioBtn').addEventListener('click', startRecording);
document.getElementById('stopRecordingBtn').addEventListener('click', stopRecording);

function addPhotos() {
    const fileInput = document.getElementById('imageUpload');
    const scrapbook = document.getElementById('scrapbook');

    if (!fileInput.files.length) {
        alert('Please select at least one image file to upload.');
        return;
    }

    for (let file of fileInput.files) {
        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed!');
            continue;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const maxWidth = 800;
                const maxHeight = 800;
                let width = img.width;
                let height = img.height;

                if (width > height && width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const compressedImg = canvas.toDataURL('image/jpeg', 0.7);

                const container = document.createElement('div');
                container.style.position = 'relative';
                container.style.margin = '10px';

                const displayImg = document.createElement('img');
                displayImg.src = compressedImg;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    scrapbook.removeChild(container);
                });

                container.appendChild(displayImg);
                container.appendChild(deleteButton);
                scrapbook.appendChild(container);
            };
        };
        reader.readAsDataURL(file);
    }
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            audioBlobUrl = URL.createObjectURL(audioBlob);

            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioBlobUrl;
        };

        mediaRecorder.start();
        document.getElementById('recordAudioBtn').disabled = true;
        document.getElementById('stopRecordingBtn').disabled = false;
    }).catch(error => {
        alert('Failed to access the microphone. Please check your browser settings.');
        console.error('Error starting recording:', error);
    });
}

function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        document.getElementById('recordAudioBtn').disabled = false;
        document.getElementById('stopRecordingBtn').disabled = true;
    } else {
        alert('No recording in progress.');
    }
}

function createPage() {
    const pageText = document.getElementById('pageText').value.trim();
    const tags = document.getElementById('tags').value.trim();
    const photos = Array.from(document.querySelectorAll('#scrapbook img')).map(img => img.src);
    const audio = audioBlobUrl || null;

    if (!pageText && photos.length === 0 && !audio) {
        alert('Please add some content to create a page.');
        return;
    }

    pages.push({ text: pageText, tags, photos, audio });
    localStorage.setItem('pages', JSON.stringify(pages));

    alert('Page created successfully!');
}

function viewAllPages() {
    window.location.href = 'newpages.html';
}
