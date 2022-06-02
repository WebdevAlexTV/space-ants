class Wave {
  constructor(spawnWave) {
    this.started = false;
    this.enemies = [];
    this.spawnWave = spawnWave;
  }

  start() {
    this.enemies = this.spawnWave();
    this.started = true;
  }

  isFinished() {
    return (
      this.started &&
      this.enemies.filter((enemy) => enemy.dead !== true).length === 0
    );
  }
}

export default Wave;
