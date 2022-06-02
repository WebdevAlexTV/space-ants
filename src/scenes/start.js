import k from "../kaboom";
import StarManager from "../entities/StarManager";

const start = () => {
  k.layers(["obj", "ui"], "obj");

  const logo = k.add([
    k.sprite("spaceants"),
    k.pos(k.width() / 2, k.height() + 60),
    k.origin("center"),
  ]);

  const starManager = new StarManager();

  k.onUpdate(() => {
    if (logo.pos.y > 100) {
      logo.pos.y -= 150 * k.dt();
    } else {
      k.go("title");
    }
    starManager.onUpdate();
  });
};

export default start;
