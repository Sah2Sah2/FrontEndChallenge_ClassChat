const messageDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

async function loadMessages() {
    try {
        const response = await fetch("https://cloud24chat.azurewebsites.net/api/messages");
        const messages = await response.json();

        messageDiv.innerHTML="";

        messages.forEach((msg) => {
            const messageElement = document.createElement("div");

            messageElement.textContent = `${msg.text}`;
            messageDiv.appendChild(messageElement);
        });

    } catch (error) {
        console.log(error);
    }
    }

async function sendMessage() {
    const text = messageInput.ariaValueMax.trim();

    if(!text){
        alert("Please enter a message");
        return;
    }

    try {
        await fetch("https://cloud24chat.azurewebsites.net/api/message", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text})
        });

        messageInput.value = "";
        loadMessages();

    } catch (error) {
    
    } 
}

// TOGGLE 
sendButton.addEventListener("click", sendMessage)
loadMessages();

//Toggle 
document.getElementById('toggleTheme').addEventListener('click', function() {
    let themeLink = document.getElementById('themeStylesheet');
    let cloudIcon = document.getElementById('cloudIcon');
    
    // Check if the current theme is sunny
    if (themeLink.getAttribute('href') === 'sunny.css') {
        // Change to rainy theme
        themeLink.setAttribute('href', 'rainy.css');
        cloudIcon.textContent = '🌧️ Cloud24 Chat 🌧️'; // Change emoji for rainy theme
    } else {
        // Change to sunny theme
        themeLink.setAttribute('href', 'sunny.css');
        cloudIcon.textContent = '🌤️ Cloud24 Chat 🌤️'; // Change emoji for sunny theme
    }
});

// Expansion text area 
const textarea = document.getElementById('messageInput');

textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset height to calculate the new height
    this.style.height = this.scrollHeight + 'px'; // Set height based on scrollHeight
});

