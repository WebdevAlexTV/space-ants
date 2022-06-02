import k from "./kaboom";

const loadSprites = () => {
  k.loadRoot("./resources/sprites/");

  k.loadSprite("spaceants", "spaceants.png");
  k.loadSprite("earth", "earth.png");
  k.loadSprite("moon", "moon.png");
  k.loadSprite("ship", "ship.png");
  k.loadSprite("ant", "ant.png", {
    sliceX: 3,
    sliceY: 1,
    anims: { idle: { from: 0, to: 0 }, thrust: { from: 1, to: 2 } },
  });
  k.loadSprite("ant_red", "ant_red.png", {
    sliceX: 3,
    sliceY: 1,
    anims: { idle: { from: 0, to: 0 }, thrust: { from: 1, to: 2 } },
  });
  k.loadSprite("wasp", "wasp.png", {
    sliceX: 3,
    sliceY: 1,
    anims: { idle: { from: 0, to: 0 }, thrust: { from: 1, to: 2 } },
  });
  k.loadSprite("spider", "spider.png", {
    sliceX: 4,
    sliceY: 1,
    anims: { idle: { from: 0, to: 1 }, thrust: { from: 2, to: 3 } },
  });
  k.loadSprite("spiderling", "spiderling.png", {
    sliceX: 2,
    sliceY: 1,
    anims: { thrust: { from: 0, to: 1 } },
  });
  k.loadSprite("shield", "shield.png", {
    sliceX: 2,
    sliceY: 1,
  });
  k.loadSprite("explosion", "explosion.png", {
    sliceX: 10,
    sliceY: 1,
    anims: { play: { from: 0, to: 9 } },
  });
};

export default loadSprites;
