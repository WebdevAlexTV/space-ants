import { AudioManager } from "../audio";
import k from "../kaboom";

class Explosion {
  constructor(position) {
    const audioManager = new AudioManager();

    const explosion = k.add([
      k.sprite("explosion"),
      k.pos(position),
      k.origin("center"),
    ]);
    explosion.play("play", { speed: 25 });

    explosion.onAnimEnd("play", () => {
      k.destroy(explosion);
    });

    audioManager.play("explosion");
  }
}

export default Explosion;
