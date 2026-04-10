const chatContainer = document.getElementById('chat-container');
const micBtn = document.getElementById('mic-btn');
let isListening = false;

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;

// UI Helpers
function appendMessage(sender, text) {
    const isYou = sender === 'You';
    const alignClass = isYou ? 'self-end bg-tgMsgOut rounded-br-sm' : 'self-start bg-tgMsgIn rounded-bl-sm';
    
    const msgHTML = `
        <div class="max-w-[75%] p-3 rounded-xl text-[15px] leading-relaxed break-words shadow-sm ${alignClass}">
            ${text}
        </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', msgHTML);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

// ---------------------------------------------------------
// LOCAL INTELLIGENCE ENGINE (REGEX ROUTER)
// ---------------------------------------------------------
// Handles tasks locally without hitting an API to save time.
const localIntents = [
    {
        pattern: /(time|ساعة)/i,
        action: () => {
            const now = new Date();
            return `The current time is ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}.`;
        }
    },
    {
        pattern: /(date|تاريخ|day)/i,
        action: () => `Today is ${new Date().toDateString()}.`
    },
    {
        pattern: /(open|افتح)\s*(youtube|يوتيوب)/i,
        action: () => {
            window.open('https://youtube.com', '_blank');
            return "Opening YouTube right now.";
        }
    },
    {
        pattern: /(open|افتح)\s*(google|جوجل)/i,
        action: () => {
            window.open('https://google.com', '_blank');
            return "Opening Google.";
        }
    },
    {
        pattern: /(search for|ابحث عن)\s+(.*)/i,
        action: (match) => {
            const query = encodeURIComponent(match[2]);
            window.open(`https://www.google.com/search?q=${query}`, '_blank');
            return `Searching Google for ${match[2]}.`;
        }
    },
    {
        // Math Engine: Evaluates basic math operations securely
        pattern: /(calculate|احسب)\s+([\d\+\-\*\/\(\)\s\.]+)/i,
        action: (match) => {
            try {
                // Using Function instead of eval for slight security improvement
                const result = new Function('return ' + match[2])();
                return `The result is ${result}.`;
            } catch (e) {
                return "I couldn't calculate that equation.";
            }
        }
    },
    {
        pattern: /(clear|نظف|امسح)/i,
        action: () => {
            chatContainer.innerHTML = '';
            return "Chat cleared.";
        }
    },
    {
        pattern: /(who are you|اسمك|من انت)/i,
        action: () => "I am Nitro, your highly optimized local assistant."
    }
];

async function processCommand(transcript) {
    appendMessage('You', transcript);
    let response = null;

    // 1. Try Local Intents First (Zero Latency)
    for (let intent of localIntents) {
        let match = transcript.match(intent.pattern);
        if (match) {
            response = intent.action(match);
            break; 
        }
    }

    // 2. Hardware API (Battery) requires async, so handled separately if needed
    if (!response && transcript.includes('battery')) {
        try {
            const battery = await navigator.getBattery();
            response = `Your battery is at ${Math.round(battery.level * 100)} percent.`;
        } catch {
            response = "I cannot access battery information.";
        }
    }

    // 3. Last Resort: AI API Call
    if (!response) {
        response = await fetchAIFallback(transcript);
    }

    // Output
    appendMessage('Nitro', response);
    speak(response);
}

// ---------------------------------------------------------
// AI API FALLBACK
// ---------------------------------------------------------
async function fetchAIFallback(prompt) {
    // Only triggers if local logic fails. Replace with actual API.
    console.log("Local logic missed. Hitting AI API...");
    
    /* const apiKey = "YOUR_API_KEY"; 
    try {
        const res = await fetch('YOUR_AI_ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ message: prompt })
        });
        const data = await res.json();
        return data.reply;
    } catch (error) {
        return "I am currently offline and my local logic didn't understand that command.";
    }
    */
   
    return `[AI API Call] Simulated response for: "${prompt}".`;
}

// ---------------------------------------------------------
// MIC EVENT LISTENERS
// ---------------------------------------------------------
recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('bg-red-500', 'animate-pulse');
    micBtn.classList.remove('bg-tgAccent');
};

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript.trim();
    await processCommand(transcript);
};

recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove('bg-red-500', 'animate-pulse');
    micBtn.classList.add('bg-tgAccent');
};

micBtn.addEventListener('click', () => {
    if (isListening) recognition.stop();
    else recognition.start();
});

// Startup
window.onload = () => {
    const greeting = "System ready. Local processing prioritized.";
    appendMessage('Nitro', greeting);
};
