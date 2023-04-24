const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.post('/api/chat', async (req, res) => {
    const prompt = req.body.prompt;
    const message = req.body.message;

    try {
        const response = await fetchChatGPTResponse(prompt, message);
        res.send({ data: response });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

async function fetchChatGPTResponse(prompt, message) {
    const apiKey = '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';
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

    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: headers,
    });

    return response.data.choices[0].message.content.trim();
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
