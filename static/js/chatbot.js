document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    // Toggle Chatbox Visibility
    chatIcon.addEventListener("click", () => {
        chatContainer.classList.toggle("active");
    });

    // Chat is cloaked for now: no AI backend is wired up, and API keys must
    // never ship in browser code. To re-enable, call a server-side proxy that
    // holds the key — never put a key in this file again.
    sendButton.addEventListener("click", () => {
        const userText = userInput.value;
        if (!userText.trim()) return;

        chatBox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
        userInput.value = "";

        chatBox.innerHTML += `<p><strong>Bot:</strong> The garden's chat is sleeping right now. ` +
            `The <a href="projects.html">Notes</a> page has everything I've written so far.</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});
