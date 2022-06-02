import constants from "./constants";
import k from "./kaboom";

const loadAudio = () => {
  k.loadRoot("./resources/audio/");

  k.loadSound("music", "music.mp3");
  k.loadSound("button", "button.mp3");
  k.loadSound("fire", "fire.mp3");
  k.loadSound("hit", "hit.mp3");
  k.loadSound("explosion", "explosion.mp3");
  k.loadSound("game_over", "game_over.mp3");
};

export class AudioManager {
  play(audioName, options) {
    return k.play(audioName, {
      volume: constants.audioVolume,
      ...options,
    });
  }
}

export default loadAudio;
