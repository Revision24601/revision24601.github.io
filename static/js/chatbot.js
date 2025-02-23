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

    sendButton.addEventListener("click", async () => {
        const userText = userInput.value;
        if (!userText.trim()) return;

        chatBox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
        userInput.value = "";

        // OpenAI API Call
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: "You are a friendly AI chatbot that cracks jokes and helps users with tech questions." },
                           { role: "user", content: userText }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});