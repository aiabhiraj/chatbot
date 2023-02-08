const chatWindow = document.querySelector(".chat-window");
const chatInput = document.querySelector(".chat-input");

chatInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const userMessage = chatInput.value;
    chatInput.value = "";

    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.innerText = userMessage;
    chatWindow.appendChild(userMessageDiv);

    generateChatbotResponse(userMessage)
      .then(function(chatbotMessage) {
        const chatbotMessageDiv = document.createElement("div");
        chatbotMessageDiv.classList.add("message");
        chatbotMessageDiv.classList.add("chatbot-message");
        chatbotMessageDiv.innerText = chatbotMessage;
        chatWindow.appendChild(chatbotMessageDiv);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
});

async function generateChatbotResponse(prompt) {
  const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.5
    })
  });

  const json = await response.json();
  return json.choices[0].text;
}
