'use client';
import { useEffect } from 'react';
import Vapi from '@vapi-ai/web';

export default function VoiceAssistant() {
  useEffect(() => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
    vapi.on('call-start', () => console.log('Call started'));
    vapi.on('message', (msg) => {
      if (msg.type === 'transcript') {
        console.log(`User: ${msg.transcript}`);
      } else if (msg.type === 'response') {
        console.log(`Assistant: ${msg.transcript}`);
      }
    });

    document.getElementById('start-call').addEventListener('click', () => {
      vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID, {
        assistant_overrides: {
          variableValues: { userName: 'Masoud' },
          recordingEnabled: true,
        }
      });
    });

    return () => { vapi.stop(); };
  }, []);

  return <button id="start-call">Talk with Assistant</button>;
}
