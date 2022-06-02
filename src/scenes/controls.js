import { AudioManager } from "../audio";
import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const controls = (previousScene) => {
  const audioManager = new AudioManager();

  k.layers(["obj", "ui"], "obj");

  initButtons();

  k.add([
    k.text("Controls", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  const textBlocks = ["[Arrow Keys] - Movement", "[Space] - Shoot"];

  const startAt = 100;
  for (let i = 0; i < textBlocks.length; i++) {
    k.add([
      k.text(textBlocks[i], { size: 12 }),
      k.pos(50, startAt + i * 14),
      k.origin("left"),
    ]);
  }

  createButton(k.width() / 2, k.height() - 50, "Back", () => {
    k.go(previousScene);
  });
};

export default controls;
