import React from 'react';

const VoiceAssistant = ({ onCommand }) => {
    const startSpeechRecognition = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.start();

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript;
            console.log("Recognized command:", command); // Log the recognized command
            onCommand(command); // Pass the command back to parent
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Sorry, there was an error with the speech recognition. Please try again.");
        };

        recognition.onend = () => {
            console.log("Speech recognition service disconnected");
        };
    };

    return (
        <div>
            <button onClick={startSpeechRecognition}>🎤 Speak</button>
        </div>
    );
};

export default VoiceAssistant;
