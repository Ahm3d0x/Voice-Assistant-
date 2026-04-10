const chatContainer = document.getElementById('chat-container');
const micBtn = document.getElementById('mic-btn');
let isListening = false;

// Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;

// UI Functions
function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg-bubble', sender === 'You' ? 'msg-you' : 'msg-nitro');
    msgDiv.innerText = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}

// Event Listeners for Mic
recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('listening');
};

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    appendMessage('You', transcript);
    await processIntent(transcript);
};

recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove('listening');
};

micBtn.addEventListener('click', () => {
    if (isListening) recognition.stop();
    else recognition.start();
});

// Intent Router - Replaces the massive if/else chain
async function processIntent(command) {
    let response = "";

    // 1. Local System Commands
    if (command.includes('time')) {
        const now = new Date();
        response = `The current time is ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}.`;
    } 
    else if (command.includes('date')) {
        response = `Today is ${new Date().toDateString()}.`;
    } 
    else if (command.includes('open youtube')) {
        response = "Opening YouTube.";
        window.open('https://youtube.com', '_blank');
    }
    else if (command.includes('battery')) {
        response = await getBatteryStatus();
    }
    else if (command.includes('clear')) {
        chatContainer.innerHTML = '';
        return; 
    }
    // 2. Dynamic Fallback (AI API Integration)
    else {
        response = await fetchAIResponse(command);
    }

    // Output result
    appendMessage('Nitro', response);
    speak(response);
}

// Hardware API Example
async function getBatteryStatus() {
    try {
        const battery = await navigator.getBattery();
        return `Your battery is at ${Math.round(battery.level * 100)} percent.`;
    } catch (e) {
        return "I cannot access battery information on this device.";
    }
}

// AI Integration (The core of making it "Smart")
async function fetchAIResponse(prompt) {
    /* To make the bot understand ANYTHING, hook up an API here (e.g., Gemini API, OpenAI API).
       This completely removes the need to hardcode Q&A pairs.
    */
    const apiKey = "YOUR_API_KEY_HERE"; 
    
    // Example implementation for a generic AI text-generation endpoint:
    /*
    try {
        const res = await fetch('YOUR_AI_ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ message: prompt })
        });
        const data = await res.json();
        return data.reply;
    } catch (error) {
        console.error("API Error:", error);
        return "I am currently disconnected from my neural network API. Please configure my backend.";
    }
    */
   
    return `You said: "${prompt}". Connect an AI API in the app.js file to give me dynamic reasoning capabilities.`;
}

// Startup Greeting
window.onload = () => {
    const greeting = "Nitro initialized. System ready.";
    appendMessage('Nitro', greeting);
    speak(greeting);
};
