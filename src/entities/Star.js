import k from "../kaboom";

class Star {
  constructor(posY = -10) {
    const star = k.add([
      k.rect(1, 1),
      k.origin("center"),
      k.color(255, 255, 255),
      k.pos(Math.floor(Math.random() * k.width()), posY),
      k.move(90, 150),
      k.layer("world"),
      {
        update: function () {
          if (
            star.pos.x < -50 ||
            star.pos.x > k.width() + 50 ||
            star.pos.y < -50 ||
            star.pos.y > k.height() + 50
          ) {
            k.destroy(star);
          }
        },
      },
    ]);
  }
}

export default Star;
