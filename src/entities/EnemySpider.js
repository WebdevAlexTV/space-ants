import constants from "../constants";
import k from "../kaboom";
import EnemySpiderling from "./EnemySpiderling";
import Explosion from "./Explosion";
import { getPlayer } from "./Player";

class EnemySpider {
  constructor(posX, posY) {
    this.dead = false;
    this.health = constants.enemies.spider.health;
    this.lastShot = constants.enemies.spider.initialCooldown;
    this.moving = true;

    this.gameobject = k.add([
      k.pos(posX, posY),
      k.sprite("spider", { frame: 0 }),
      k.origin("center"),
      k.body(),
      k.area(),
      k.rotate(180),
      k.scale(1),
      k.state("idle", ["idle", "thrust"]),
      "enemy",
      {
        object: this,
        update: () => this.onUpdate(),
      },
    ]);
    this.player = getPlayer();

    this.gameobject.onStateEnter("idle", () => {
      this.gameobject.play("idle");
    });

    this.gameobject.onStateEnter("thrust", () => {
      this.gameobject.play("thrust", { loop: true });
    });
  }

  shoot() {
    if (this.lastShot === 0) {
      this.spawnSpiderling();
      for (let i = 1; i < constants.enemies.spider.spawnCount; i++) {
        k.wait(0.5 * i, () => this.spawnSpiderling());
      }

      this.lastShot = constants.enemies.spider.shootCooldown;
    }
  }

  spawnSpiderling() {
    if (this.dead) {
      return;
    }

    return new EnemySpiderling(
      this.gameobject.pos.x + Math.floor(Math.random() * 100) - 50,
      this.gameobject.pos.y + 40
    );
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
    this.shoot();

    if (this.lastShot > 0) {
      this.lastShot = Math.max(this.lastShot - k.dt(), 0);
    }

    if (this.gameobject.pos.dist(this.player.pos) > 150) {
      this.gameobject.move(
        k.Vec2.fromAngle(this.gameobject.angle - 90).scale(
          constants.enemies.spider.speed
        )
      );
      this.moving = true;
      if (this.gameobject.state !== "thrust") {
        this.gameobject.enterState("thrust");
      }
    } else {
      this.moving = false;
      if (this.gameobject.state !== "idle") {
        this.gameobject.enterState("idle");
      }
    }
  }
}

export default EnemySpider;
