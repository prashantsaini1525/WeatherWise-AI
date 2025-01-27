import React from 'react';
import PageHeading from "../components/PageHeading"; // Import the PageHeading component
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
            <PageHeading
                title="Voice Assistant"
                subtitle="Interact with the app using voice commands for a seamless experience."
            />
            <VoiceAssistant onCommand={handleCommand} />
        </div>
    );
};

export default VoiceAssistantPage;
