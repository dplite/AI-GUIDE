import React, { useEffect, useState } from "react";
import MapView from "../components/Maps";
import VoiceInput from "../components/VoiceInput";
import axios from "axios";
import StarsComponent from "../components/StarsComponent";
import SpotifyPlayer from "../components/SpotifyEmbed";

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      setUserLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  const getQueryFromAI = async (data, isSong) => {
    try {
      let request = {
        generalInfo: data,
      };
      if (isSong) {
        request = { song: data };
      }
      const response = await axios.post(
        "http://localhost:3000/ai/details",
        request
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const TextToSpeech = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in your browser.");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    let voices = synth.getVoices();
    if (voices.length === 0) {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
        speech.voice =
          voices.find((v) => v.name.includes("Google")) || voices[0];
        synth.speak(speech);
      };
    } else {
      speech.voice = voices.find((v) => v.name.includes("Google")) || voices[0];
      setTimeout(() => {
        synth.speak(speech);
      }, 0);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-auto h-full">
      {/* <StarsComponent /> */}
      <div className="max-w-7xl w-full relative z-10 text-white p-6 z-10 h-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 neon-text">
            <span className="text-5xl">🚗</span> AI Backseat Driver
          </h1>
          <p className="text-lg text-gray-300">
            Your intelligent driving companion
          </p>
        </header>

        <div className="glass-card p-6 mb-6">
          {userLocation && <MapView userLocation={userLocation} />}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4 neon-text">
            Voice Commands
          </h2>
          <VoiceInput
            onUserQuery={async (data) => {
              const response = await getQueryFromAI(data, false);
              TextToSpeech(response.data.info);
            }}
            onPlaySong={async (data) => {
              const response = await getQueryFromAI(data, true);
              setSpotifyData(response);
              //TextToSpeech(response.data.info);
            }}
          />
        </div>
        {console.log(spotifyData, "datata")}
        {spotifyData && (
          <div className="glass-card p-6 mt-7">
            <h2 className="text-2xl font-semibold mb-4 neon-text">
              Mini Youtube :D
            </h2>
            <SpotifyPlayer spotifyUrl={spotifyData.data.streamingLink} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
