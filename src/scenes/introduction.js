import { AudioManager } from "../audio";
import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const introduction = (previousScene) => {
  const addShip = (posX, posY) => {
    k.add([
      k.rect(2, 4),
      k.pos(posX, posY),
      k.origin("center"),
      k.color(255, 255, 255),
      k.move(k.Vec2.fromAngle(-90).scale(20), 2),
      k.layer("ui"),
      {
        update: function () {
          if (this.pos.y < k.height() - 100) {
            k.destroy(this);
          }
        },
      },
    ]);
  };

  const audioManager = new AudioManager();

  k.layers(["obj", "ui"], "obj");

  initButtons();

  k.add([
    k.text("Introduction", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  const lines = [
    "People destroy the earth and don't care about other living beings.",
    "That's why the insects have decided to turn their backs on the world.",
    "These are now on their way to the moon. But some insects are afraid ",
    "that there is not enough space and try to kill the other species.",
    "You must protect your folk at all costs on the way to the moon.",
  ];

  const startAt = 100;
  for (let i = 0; i < lines.length; i++) {
    k.add([
      k.text(lines[i], { size: 12 }),
      k.pos(50, startAt + i * 14),
      k.origin("left"),
    ]);
  }

  k.add([
    k.sprite("moon"),
    k.pos(k.width() - 100, k.height() - 250),
    k.scale(1.5),
  ]);

  k.add([
    k.sprite("earth"),
    k.origin("bot"),
    k.pos(k.width() - 75, k.height()),
    k.scale(1.5),
  ]);

  // Ships
  addShip(k.width() - 100, k.height() - 20);
  addShip(k.width() - 80, k.height() - 19);
  addShip(k.width() - 100, k.height() - 20);
  addShip(k.width() - 93, k.height() - 22);
  addShip(k.width() - 110, k.height() - 19);
  addShip(k.width() - 123, k.height() - 23);
  addShip(k.width() - 30, k.height() - 22);
  addShip(k.width() - 50, k.height() - 20);
  addShip(k.width() - 15, k.height() - 19);

  createButton(k.width() / 2, k.height() - 50, "Start", () => {
    k.go("game");
  });
};

export default introduction;
