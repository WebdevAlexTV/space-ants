import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const gameOver = () => {
  k.layers(["obj", "ui"], "obj");

  initButtons();

  k.add([
    k.text("Game Over!", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  createButton(k.width() / 2, k.height() - 50, "Main Menu", () => {
    k.go("start");
  });
};

export default gameOver;
