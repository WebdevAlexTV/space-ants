export default {
  tileSize: 32,
  acceleration: 100,
  brake: 60,
  maxSpeed: 200,
  movementSpeed: 60,
  turnSpeed: 150,
  shootCooldown: 0.2,
  audioVolume: 0.6,
  enemies: {
    ant: {
      health: 3,
      shootCooldown: 3,
      speed: 30,
    },
    wasp: {
      health: 3,
      shootCooldown: 4,
      speed: 30,
    },
    spider: {
      health: 20,
      shootCooldown: 10,
      initialCooldown: 2,
      speed: 20,
      spawnCount: 10,
    },
    spiderling: {
      health: 2,
      shootCooldown: 0,
      speed: 50,
    },
  },
};
