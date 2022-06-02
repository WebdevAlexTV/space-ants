import k from "../kaboom";
import { getPlayer } from "./Player";

class HealthIndicator {
  constructor() {
    this.player = getPlayer();
    this.playerHealth = this.player.object.health;
    this.healthPainted = this.player.object.maxHealth;

    this.indicators = [];

    for (let i = 0; i < this.player.object.maxHealth; i++) {
      this.indicators.push(
        k.add([
          k.sprite("shield", { frame: 0 }),
          k.origin("center"),
          k.pos(k.width() - 20 - 18 * i, k.height() - 20),
          k.layer("ui"),
        ])
      );
    }
  }

  onUpdate() {
    if (!this.player || this.player.object.dead) {
      this.playerHealth = 0;
    } else {
      this.playerHealth = this.player.object.health;
    }
    if (this.healthPainted !== this.playerHealth) {
      for (let i = 0; i < this.player.object.maxHealth; i++) {
        if (i >= this.playerHealth) {
          this.indicators[i].frame = 1;
        } else {
          this.indicators[i].frame = 0;
        }
      }
      this.healthPainted = this.playerHealth;
    }
  }
}

export default HealthIndicator;
