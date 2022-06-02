import constants from "../constants";
import k from "../kaboom";
import level from "../level";
import Player from "../entities/Player";
import SpeedMeter from "../entities/SpeedMeter";
import EnemyAnt from "../entities/EnemyAnt";
import PlayerBorderIndicator from "../entities/PlayerBorderIndicator";
import HealthIndicator from "../entities/HealthIndicator";
import EnemyWasp from "../entities/EnemyWasp";
import EnemySpider from "../entities/EnemySpider";
import WaveManager from "../entities/WaveManager";
import Wave from "../entities/Wave";
import StarManager from "../entities/StarManager";
import { AudioManager } from "../audio";

const game = () => {
  const createEnemyWave = (numberOfEnemies, createEnemy) => {
    const enemies = [];
    const xPartial = k.width() / (numberOfEnemies + 1);
    for (let i = 1; i <= numberOfEnemies; i++) {
      enemies.push(createEnemy(xPartial * i, -30));
    }
    return enemies;
  };

  const showText = (value) => {
    const text = k.add([
      k.text(value, { size: 20 }),
      k.pos(k.width() / 2, 40),
      k.origin("center"),
      k.layer("ui"),
      k.lifespan(3, { fade: 0.5 }),
    ]);
  };

  k.gravity(0);
  k.layers(["bg", "world", "game", "ui"], "game");

  // Build the level
  k.addLevel(level, {
    width: constants.tileSize,
    height: constants.tileSize,
    pos: k.vec2(0, 0),
    // " ": () => [k.layer("bg"), k.sprite("world", { frame: 72 })],
  });

  const player = new Player();
  const speedMeter = new SpeedMeter();
  const playerBorderIndicator = new PlayerBorderIndicator();
  const healthIndicator = new HealthIndicator();
  const waveManager = new WaveManager();
  const starManager = new StarManager();
  const audioManager = new AudioManager();

  const backgroundMusic = audioManager.play("music", { loop: true });

  waveManager.addWave(
    new Wave(() => createEnemyWave(1, (x, y) => new EnemyAnt(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(2, (x, y) => new EnemyAnt(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(3, (x, y) => new EnemyAnt(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(4, (x, y) => new EnemyAnt(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(1, (x, y) => new EnemyWasp(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(2, (x, y) => new EnemyWasp(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(3, (x, y) => new EnemyWasp(x, y)))
  );

  waveManager.addWave(
    new Wave(() => createEnemyWave(1, (x, y) => new EnemySpider(x, y)))
  );

  showText(waveManager.startWave());

  // Controls
  k.onKeyDown("left", () => {
    if (!k.isKeyDown("right")) {
      player.turnLeft();
    }
  });

  k.onKeyDown("right", () => {
    if (!k.isKeyDown("left")) {
      player.turnRight();
    }
  });

  k.onKeyDown("up", () => {
    player.accelerate();
  });

  k.onKeyDown("down", () => {
    player.slowDown();
  });

  k.onKeyRelease("left", () => {
    if (!k.isKeyPressed("right")) {
      player.setTurning(null);
    }
  });

  k.onKeyRelease("right", () => {
    if (!k.isKeyPressed("left")) {
      player.setTurning(null);
    }
  });

  k.onKeyDown("space", () => {
    player.shoot();
  });

  k.onUpdate(() => {
    if (!player.dead) {
      playerBorderIndicator.onUpdate();
    }

    healthIndicator.onUpdate();
    starManager.onUpdate();

    if (waveManager.currentWaveIsFinished() && !player.dead) {
      if (waveManager.hasNextWave()) {
        showText(waveManager.nextWave());
      } else {
        backgroundMusic.stop();
        k.go("success");
      }
    }

    // Slow down if no key is pressed
    if (!k.isKeyDown("up") && !k.isKeyDown("down")) {
      if (player.velocity - 30 * k.dt() < 0) {
        player.velocity = 0;
      } else {
        player.velocity -= 30 * k.dt();
      }
    }

    // Refresh meter
    speedMeter.onUpdate();
  });

  player.ship.on("death", function () {
    backgroundMusic.stop();
  });

  k.onCollide("enemy", "player-projectile", (enemy, projectile) => {
    audioManager.play("hit");
    k.destroy(projectile);
    enemy.object.damage(1);
  });

  k.onCollide("player", "enemy-projectile", (player, projectile) => {
    audioManager.play("hit");
    k.destroy(projectile);
    player.object.damage(1);
  });

  k.onCollide("player", "enemy", (player, enemy) => {
    if (!player.dead) {
      player.object.die();
    }
    if (!enemy.dead) {
      enemy.object.die();
    }
  });

  k.onCollide(
    "enemy-spiderling",
    "player-projectile",
    (spiderling, projectile) => {
      k.destroy(projectile);
      spiderling.object.damage(1);
    }
  );

  k.onCollide("player", "enemy-spiderling", (player, spiderling) => {
    spiderling.object.die();
    player.object.damage(1);
  });
};

const loadWithBackground = (position, spriteFrame, backgroundSpriteFrame) => [
  k.layer("bg"),
  k.sprite("world", { frame: backgroundSpriteFrame }),
  {
    add: () => {
      k.add([
        k.sprite("world", { frame: spriteFrame }),
        k.pos(position.x * constants.tileSize, position.y * constants.tileSize),
        k.layer("world"),
      ]);
    },
  },
];

export default game;
