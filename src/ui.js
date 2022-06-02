import { AudioManager } from "./audio";
import k from "./kaboom";

export const createButton = (posX, posY, text, clickHandler = () => {}) => {
  const buttonText = k.add([
    k.text(text, { size: 12 }),
    k.pos(posX, posY),
    k.layer("ui"),
    k.origin("center"),
    k.area({ width: 144, height: 32 }),
    "button",
    {
      clickHandler: clickHandler,
    },
  ]);
  const button = k.add([
    k.pos(buttonText.pos.x, buttonText.pos.y),
    k.rect(144, 32),
    k.color(k.rgb(0, 0, 0)),
    k.outline(1, k.rgb(255, 255, 255)),
    k.origin("center"),
    k.area(),
    "button_background",
  ]);
};

export const initButtons = () => {
  const audioManager = new AudioManager();

  k.onClick("button", (button) => {
    audioManager.play("button");
    button.clickHandler();
  });

  k.onHover(
    "button_background",
    (background) => {
      background.color = k.rgb(49, 230, 50);
    },
    (background) => {
      background.color = k.rgb(0, 0, 0);
    }
  );
};
