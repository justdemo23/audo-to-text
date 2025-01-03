function uploadAudio() {
    const fileInput = document.getElementById('audioFile');
    const audioFile = fileInput.files[0];

    if (!audioFile) {
        alert("Por favor, selecciona un archivo de audio.");
        return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);

    fetch('/audio', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.English && data.Spanish) {
            document.getElementById('resultEnglish').innerText = 'Texto en Inglés: ' + data.English;
            document.getElementById('resultSpanish').innerText = 'Texto en Español: ' + data.Spanish;
        } else {
            document.getElementById('resultEnglish').innerText = "Error: " + data.error;
            document.getElementById('resultSpanish').innerText = "Error: " + data.error;
        }
    })
    .catch(error => {
        console.error('Error al enviar el archivo de audio:', error);
        document.getElementById('resultEnglish').innerText = 'Error al procesar el archivo de audio.';
        document.getElementById('resultSpanish').innerText = 'Error al procesar el archivo de audio.';
    });
}
