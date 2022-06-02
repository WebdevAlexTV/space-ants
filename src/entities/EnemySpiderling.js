import constants from "../constants";
import k from "../kaboom";
import Explosion from "./Explosion";
import { getPlayer } from "./Player";

class EnemySpiderling {
  constructor(posX, posY) {
    this.dead = false;
    this.health = constants.enemies.spiderling.health;
    this.lastShot = constants.enemies.spiderling.shootCooldown;
    this.moving = true;

    this.gameobject = k.add([
      k.pos(posX, posY),
      k.sprite("spiderling", { frame: 0, anim: "thrust", scale: 0.2 }),
      k.origin("center"),
      k.area(),
      k.rotate(180),
      k.scale(1),
      "enemy-spiderling",
      {
        object: this,
        update: () => this.onUpdate(),
      },
    ]);
    this.player = getPlayer();
  }

  damage(value) {
    this.health -= value;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    if (this.gameobject) {
      new Explosion(this.gameobject.pos);
    }
    k.destroy(this.gameobject);
    this.dead = true;
  }

  rotateToPlayer() {
    const angle = Math.atan2(
      this.player.pos.y - this.gameobject.pos.y,
      this.player.pos.x - this.gameobject.pos.x
    );

    this.gameobject.angle = angle * (180 / Math.PI) + 90;
  }

  onUpdate() {
    if (!this.player || this.player.dead) {
      return;
    }

    this.rotateToPlayer();

    this.gameobject.move(
      k.Vec2.fromAngle(this.gameobject.angle - 90).scale(
        constants.enemies.spiderling.speed
      )
    );
  }
}

export default EnemySpiderling;
