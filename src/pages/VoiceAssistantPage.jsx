import React from 'react';
import VoiceAssistant from '../components/VoiceAssistant';

const VoiceAssistantPage = () => {
    const handleCommand = (command) => {
        console.log("User Command:", command);
        // Implement functionality based on command
        if (command.toLowerCase().includes("weather")) {
            alert("Redirecting to the weather page...");
            // Add routing/navigation logic if needed
        } else {
            alert(`Command not recognized: ${command}`);
        }
    };

    return (
        <div>
            <h1>Voice Assistant</h1>
            <p>Speak into the microphone to interact with the app.</p>
            <VoiceAssistant onCommand={handleCommand} />
        </div>
    );
};

export default VoiceAssistantPage;

