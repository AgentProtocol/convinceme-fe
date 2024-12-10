import { useState, useEffect } from "react";

interface Transcript {
  id: number;
  transcript: string;
  username: string;
  createdAt: Date;
}

export default function TranscriptList() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  useEffect(() => {
    setTranscripts(demoTranscripts.reverse());
    // TODO:
    // // Fetch initial transcripts
    // const fetchTranscripts = async () => {
    //   try {
    //     const response = await fetch('TODO/api/transcripts');
    //     const data = await response.json();
    //     setTranscripts(data);
    //   } catch (error) {
    //     console.error('Failed to fetch transcripts:', error);
    //   }
    // };

    // fetchTranscripts();

    // // Set up WebSocket connection
    // const ws = new WebSocket('ws://your-websocket-url');

    // ws.onmessage = (event) => {
    //   const newTranscript = JSON.parse(event.data);
    //   setTranscripts(prev => [...prev, newTranscript]);
    // };

    // // Cleanup WebSocket connection
    // return () => {
    //   ws.close();
    // };
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="max-h-[40vh] overflow-y-auto flex flex-col-reverse">
        {[...transcripts].reverse().map((transcript) => (
          <div key={transcript.id} className="p-4 text-center">
            <div className="mb-2 font-semibold text-gray-700">
              {transcript.username}
            </div>
            <p className="text-gray-800">
              {transcript.transcript}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const demoTranscripts: Transcript[] = [
  {
    id: 1,
    transcript: "I firmly believe pineapple belongs on pizza. The sweet and savory combination is unmatched!",
    username: "PizzaPhilosopher",
    createdAt: new Date(),
  },
  {
    id: 2,
    transcript: "That's culinary blasphemy! Pizza is meant to be savory. What's next, putting chocolate on spaghetti?",
    username: "ChefLogic",
    createdAt: new Date(),
  },
  {
    id: 3,
    transcript: "Actually, the combination of sweet and savory has historical precedent. Hawaiian pizza was invented in Canada in 1962!",
    username: "PizzaPhilosopher",
    createdAt: new Date(),
  },
  {
    id: 4,
    transcript: "Just because something was invented doesn't make it right. The Italians would be horrified!",
    username: "ChefLogic", 
    createdAt: new Date(),
  },
  {
    id: 5,
    transcript: "Food evolves! Pizza itself has evolved from its Neapolitan origins. Why stop innovating now?",
    username: "PizzaPhilosopher",
    createdAt: new Date(),
  }
]