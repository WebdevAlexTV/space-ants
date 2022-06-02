import { AudioManager } from "../audio";
import constants from "../constants";
import k from "../kaboom";
import Explosion from "./Explosion";
import Projectile from "./Projectile";

class Player {
  constructor() {
    this.maxHealth = 5;
    this.health = 5;
    this.lastShot = 0;
    this.velocity = 0;
    this.turning = null;

    this.ship = k.add([
      k.pos(k.width() / 2, k.height() - 40),
      k.sprite("ant", { frame: 0 }),
      k.origin("center"),
      k.body(),
      k.area(),
      k.rotate(0),
      k.scale(1),
      k.state("idle", ["idle", "thrust"]),
      "player",
      {
        object: this,
        update: () => this.onUpdate(),
      },
    ]);

    this.ship.onStateEnter("idle", () => {
      this.ship.play("idle");
    });

    this.ship.onStateEnter("thrust", () => {
      this.ship.play("thrust", { loop: true });
    });
  }

  setTurning(turning) {
    this.turning = turning;
  }

  damage(value) {
    this.health -= value;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    if (this.ship) {
      new Explosion(this.ship.pos);
      const audioManager = new AudioManager();
      this.ship.trigger("death");
      audioManager.play("game_over");
      k.go("gameOver");
    }

    this.dead = true;
    k.destroy(this.ship);
    this.ship = null;
  }

  shoot() {
    if (this.dead) {
      return;
    }
    if (this.lastShot === 0) {
      const projectilePos = k.Vec2.fromAngle(this.ship.angle - 90).scale(35);
      projectilePos.x += this.ship.pos.x;
      projectilePos.y += this.ship.pos.y;

      new Projectile(projectilePos, this.ship.angle, "player-projectile");

      this.lastShot = constants.shootCooldown;
    }
  }

  turnLeft() {
    if (this.dead) {
      return;
    }
    this.ship.angle -= constants.turnSpeed * k.dt();
    this.turning = "left";
  }

  turnRight() {
    if (this.dead) {
      return;
    }
    this.ship.angle += constants.turnSpeed * k.dt();
    this.turning = "left";
  }

  accelerate() {
    if (this.dead) {
      return;
    }
    if (this.velocity < constants.maxSpeed) {
      this.velocity += constants.acceleration * k.dt();
    }
  }

  slowDown() {
    if (this.dead) {
      return;
    }
    if (this.velocity > 0) {
      if (this.velocity - constants.brake * k.dt() < 0) {
        this.velocity = 0;
      } else {
        this.velocity -= constants.brake * k.dt();
      }
    }
  }

  onUpdate() {
    if (this.dead) {
      return;
    }

    if (this.velocity > 0 && this.ship.state !== "thrust") {
      this.ship.enterState("thrust");
    }
    if (this.velocity === 0 && this.ship.state !== "idle") {
      this.ship.enterState("idle");
    }

    // Move the ship
    this.ship.move(k.Vec2.fromAngle(this.ship.angle - 90).scale(this.velocity));

    if (this.lastShot > 0) {
      this.lastShot = Math.max(this.lastShot - k.dt(), 0);
    }
  }
}

export const getPlayer = () => {
  return k.get("player")[0];
};

export default Player;
