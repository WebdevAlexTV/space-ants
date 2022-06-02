import constants from "../constants";
import k from "../kaboom";
import { getPlayer } from "./Player";

class SpeedMeter {
  constructor() {
    this.speed = k.add([
      k.text("Speed: 0 %", { size: 12 }),
      k.pos(60, k.height() - 20),
      k.origin("center"),
    ]);
  }

  onUpdate() {
    const player = getPlayer();
    if (player) {
      this.speed.text = `Speed: ${Math.floor(
        (100 / constants.maxSpeed) * player.object.velocity
      )} %`;
    }
  }
}

export default SpeedMeter;
