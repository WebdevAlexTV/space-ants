import k from "../kaboom";
import { AudioManager } from "../audio";

class Projectile {
  constructor(position, rotation, tag) {
    const audioManager = new AudioManager();

    const projectile = k.add([
      k.rect(2, 4),
      k.area(),
      k.pos(position),
      k.origin("center"),
      k.color(255, 255, 255),
      k.move(k.Vec2.fromAngle(rotation - 90).scale(20), 200),
      k.rotate(rotation),
      tag,
      {
        update: function () {
          if (
            projectile.pos.x < -50 ||
            projectile.pos.x > k.width() + 50 ||
            projectile.pos.y < -50 ||
            projectile.pos.y > k.height() + 50
          ) {
            k.destroy(projectile);
          }
        },
      },
    ]);
    audioManager.play("fire");
  }
}

export default Projectile;
