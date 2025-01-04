const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://ollama:11434';
const DEFAULT_OLLAMA_MODEL = 'llama2';

let isOpenAIAvailable = true;
let lastHealthCheck = Date.now();
const HEALTH_CHECK_INTERVAL = 60000; // 60 seconds

// Health check function for OpenAI API
async function checkOpenAIHealth() {
    try {
        await axios.get(`${OPENAI_API_URL}/models`, {
            headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
        });
        isOpenAIAvailable = true;
        console.log('OpenAI API is available');
    } catch (error) {
        isOpenAIAvailable = false;
        console.error('OpenAI API is unavailable:', error.message);
    }
    lastHealthCheck = Date.now();
}

// Start periodic health checks
setInterval(checkOpenAIHealth, HEALTH_CHECK_INTERVAL);
checkOpenAIHealth(); // Initial check

// Health endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        openai: {
            available: isOpenAIAvailable,
            lastCheck: new Date(lastHealthCheck).toISOString()
        }
    });
});

// OpenAI API proxy with Ollama fallback
app.post('/v1/*', async (req, res) => {
    const path = req.path;
    const body = req.body;

    try {
        // Try OpenAI first if available
        if (isOpenAIAvailable) {
            try {
                const response = await axios.post(`${OPENAI_API_URL}${path}`, body, {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                return res.json(response.data);
            } catch (error) {
                if (error.response?.status === 429 || error.code === 'ECONNABORTED') {
                    console.log('OpenAI rate limited or timeout, falling back to Ollama');
                } else {
                    throw error;
                }
            }
        }

        // Fallback to Ollama
        console.log('Using Ollama fallback');
        const ollamaBody = {
            model: DEFAULT_OLLAMA_MODEL,
            prompt: body.messages?.[body.messages.length - 1]?.content || body.prompt,
            stream: false
        };

        const ollamaResponse = await axios.post(`${OLLAMA_API_URL}/api/generate`, ollamaBody);
        
        // Format Ollama response to match OpenAI format
        const response = {
            id: 'ollama-' + Date.now(),
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: DEFAULT_OLLAMA_MODEL,
            choices: [{
                message: {
                    role: 'assistant',
                    content: ollamaResponse.data.response
                },
                finish_reason: 'stop',
                index: 0
            }],
            usage: {
                prompt_tokens: -1,
                completion_tokens: -1,
                total_tokens: -1
            }
        };

        res.json(response);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: {
                message: 'An error occurred while processing your request',
                type: error.name,
                details: error.message
            }
        });
    }
});

const port = process.env.OPENAI_PROXY_PORT || 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`OpenAI proxy server running on port ${port}`);
});
