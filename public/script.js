document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    // Show thinking message
    responseDiv.textContent = 'Thinking...';

    try {
        const response = await fetch('https://backend-khaki-nine-51.vercel.app/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userInput }) // Cambiado de "message" a "prompt"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`${errorText}`);
        }

        const data = await response.json();
        responseDiv.textContent = data.reply || 'No response from AI';
    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'Error: ' + error.message;
    }
});