const axios = require('axios');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let callId = `test-call-${Date.now()}`;

// The webhook URL (localhost in this case)
const webhook = 'http://localhost:3000/vapi/events';

// Function to prompt user for input
function prompt() {
  console.log('\n===== VAPI Webhook Simulator =====');
  console.log('1. Simulate call start');
  console.log('2. Send customer transcription');
  console.log('3. Send assistant transcription');
  console.log('4. Simulate call end');
  console.log('5. Generate new call ID');
  console.log('6. Exit');
  console.log('=================================');
  console.log(`Current call ID: ${callId}`);
  
  rl.question('Select an option (1-6): ', async (option) => {
    switch (option) {
      case '1':
        await simulateCallStart();
        break;
      case '2':
        rl.question('Enter customer message: ', async (text) => {
          await sendTranscription(text, 'customer');
        });
        return; // Skip the prompt call at the end
      case '3':
        rl.question('Enter assistant message: ', async (text) => {
          await sendTranscription(text, 'assistant');
        });
        return; // Skip the prompt call at the end
      case '4':
        await simulateCallEnd();
        break;
      case '5':
        callId = `test-call-${Date.now()}`;
        console.log(`New call ID generated: ${callId}`);
        break;
      case '6':
        rl.close();
        return;
      default:
        console.log('Invalid option. Please try again.');
    }
    prompt();
  });
}

// Function to simulate call-start event
async function simulateCallStart() {
  try {
    const response = await axios.post(webhook, {
      type: 'call-start',
      callId,
      channel: 'assistant'
    });
    console.log(`Call start simulated. Status: ${response.status}`);
  } catch (error) {
    console.error('Error simulating call start:', error.message);
  }
}

// Function to send transcription event
async function sendTranscription(text, channel) {
  try {
    const response = await axios.post(webhook, {
      type: 'transcriber-response',
      callId,
      transcription: text,
      channel
    });
    console.log(`Transcription sent as ${channel}. Status: ${response.status}`);
    prompt();
  } catch (error) {
    console.error('Error sending transcription:', error.message);
    prompt();
  }
}

// Function to simulate call-end event
async function simulateCallEnd() {
  try {
    const response = await axios.post(webhook, {
      type: 'call-end',
      callId,
      channel: 'assistant'
    });
    console.log(`Call end simulated. Status: ${response.status}`);
  } catch (error) {
    console.error('Error simulating call end:', error.message);
  }
}

// Start the simulator
console.log('Starting VAPI webhook simulator...');
prompt();
