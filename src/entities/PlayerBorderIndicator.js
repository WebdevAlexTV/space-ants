import k from "../kaboom";
import { getPlayer } from "./Player";

class PlayerBorderIndicator {
  constructor() {
    this.player = getPlayer();
    this.indicator = k.add([
      k.pos(k.width() / 2, k.height() / 2),
      k.sprite("ant", { frame: 0 }),
      k.origin("center"),
      k.rotate(0),
      k.scale(1),
      k.opacity(0),
    ]);
    this.indicator.play("thrust");
  }

  onUpdate() {
    const playerPos = this.player.pos;
    if (
      playerPos.x < -20 ||
      playerPos.x > k.width() + 20 ||
      playerPos.y < -20 ||
      playerPos.y > k.height() + 20
    ) {
      this.indicator.opacity = 0.5;
      this.indicator.angle = this.player.angle;
      if (playerPos.x < 0) {
        this.indicator.pos.x = 20;
      } else if (playerPos.x > k.width()) {
        this.indicator.pos.x = k.width() - 20;
      } else {
        this.indicator.pos.x = playerPos.x;
      }
      if (playerPos.y < 0) {
        this.indicator.pos.y = 20;
      } else if (playerPos.y > k.height()) {
        this.indicator.pos.y = k.height() - 20;
      } else {
        this.indicator.pos.y = playerPos.y;
      }
    } else {
      this.indicator.opacity = 0;
    }
  }
}

export default PlayerBorderIndicator;
