const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { prompt, message } = req.body;
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

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: requestBody,
    });

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing request');
  }
};
