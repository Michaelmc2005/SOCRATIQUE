// Retrieve the system prompt from sessionStorage
const systemPrompt = sessionStorage.getItem('systemPrompt');

async function fetchChatGPTResponse(prompt, message) {
  const requestBody = JSON.stringify({ prompt, message });

  const response = await fetch('./api/openai-api.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  });

  const data = await response.json();
  console.log('OpenAI API response:', data);
  console.log('Server response:', data);


  return data.choices[0].message.content.trim();
}



document.getElementById('chatForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = document.getElementById('userMessage').value;

  // Display the user's message
  const userMessageElement = document.createElement('p');
  userMessageElement.textContent = `You: ${userMessage}`;
  document.getElementById('chat-output').appendChild(userMessageElement);

  // Clear the input field
  document.getElementById('userMessage').value = '';

  // Interact with ChatGPT using the system prompt and user message
  const chatGPTResponse = await fetchChatGPTResponse(systemPrompt, userMessage);

  // Display ChatGPT's response
  const chatGPTResponseElement = document.createElement('p');
  chatGPTResponseElement.innerHTML = `<strong>Socratique:</strong> ${chatGPTResponse}`;
  document.getElementById('chat-output').appendChild(chatGPTResponseElement);
  
});
