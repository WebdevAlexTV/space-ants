import k from "../kaboom";
import { createButton, initButtons } from "../ui";

const success = () => {
  k.layers(["obj", "ui"], "obj");

  initButtons();

  k.add([
    k.text("You saved your folk!", { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.origin("center"),
  ]);

  const lines = [
    "Good job! Your folk is save.",
    "",
    "",
    "Now go and populate the moon!",
    "",
    "",
    "",
    "",
    "",
    "Thanks for playing!",
  ];

  const startAt = 100;
  for (let i = 0; i < lines.length; i++) {
    k.add([
      k.text(lines[i], { size: 12 }),
      k.pos(50, startAt + i * 14),
      k.origin("left"),
    ]);
  }

  const moon = k.add([
    k.sprite("moon"),
    k.pos(k.width() - 100, k.height() - 250),
    k.scale(1.5),
  ]);

  k.add([
    k.sprite("ant"),
    k.pos(k.width() / 2, k.height() / 2),
    k.scale(1),
    k.rotate(45),
  ]);

  createButton(k.width() / 2, k.height() - 50, "Main Menu", () => {
    k.go("start");
  });
};

export default success;
