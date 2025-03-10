import React from "react";

const VoiceInput = ({ onUserQuery, onPlaySong }) => {
  let recognition;
  const startListening = (isSong) => {
    recognition = new window.webkitSpeechRecognition();
    console.log(recognition, "rec");
    recognition.onresult = (event) => {
      const userQuery = event.results[0][0].transcript;
      if (isSong) {
        onPlaySong(userQuery);
      } else onUserQuery(userQuery);
    };
    recognition.start();
  };
  const stopListening = () => {
    recognition?.stop();
  };

  return (
    <div className="flex justify-center items-center gap-6 mt-6">
      <button
        className="relative px-8 py-3 text-lg font-semibold text-white rounded-full transition-all duration-300
               bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-400/50 
               hover:brightness-110 active:scale-95"
        onClick={() => {
          startListening(false);
        }}
      >
        🎙️ Speak
      </button>

      <button
        className="relative px-8 py-3 text-lg font-semibold text-white rounded-full transition-all duration-300
               bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:shadow-red-400/50 
               hover:brightness-110 active:scale-95"
        onClick={stopListening}
      >
        🛑 Stop
      </button>
      <button
        className="relative px-8 py-3 text-lg font-semibold text-white rounded-full transition-all duration-300
               bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:shadow-red-400/50 
               hover:brightness-110 active:scale-95"
        onClick={() => {
          startListening(true);
        }}
      >
        Play Music
      </button>
    </div>
  );
};

export default VoiceInput;
