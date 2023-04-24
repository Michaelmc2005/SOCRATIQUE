
// Retrieve the system prompt from sessionStorage
const systemPrompt = sessionStorage.getItem('systemPrompt');

async function fetchChatGPTResponse(prompt, message) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
  const requestBody = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: message },
    ],
    temperature: 0.9,
  });

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: headers,
    body: requestBody,
  });

  const data = await response.json();
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
