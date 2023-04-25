import { useState, useEffect } from "react";
import audio from "../../../../public/path/Audio.mp3";
import audioOn from "../../../../public/path/audioOn.svg";
import audioOff from "../../../../public/path/audioOff.svg";
import "./AudioPlayer.scss";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("audio");
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button className="audioBtn" onClick={toggleAudio}>
        {isPlaying ? (
          <img src={audioOff} style={{ width: "20px" }} />
        ) : (
          <img src={audioOn} style={{ width: "20px", color: "green" }} />
        )}
      </button>
      <audio id="audio" loop onEnded={() => setIsPlaying(true)}>
        <source src={audio} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
