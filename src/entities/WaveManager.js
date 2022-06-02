import k from "../kaboom";

class WaveManager {
  constructor() {
    this.waves = [];
    this.currentWave = 1;
  }

  startWave() {
    const wave = this.waves[this.currentWave - 1];
    wave.start();

    return this.getWaveText();
  }

  nextWave() {
    this.currentWave++;
    k.wait(3, () => this.startWave());

    return this.getWaveText();
  }

  hasNextWave() {
    return this.waves[this.currentWave] !== undefined;
  }

  getWaveText() {
    return this.currentWave === this.waves.length
      ? "Final Wave"
      : `Wave ${this.currentWave}`;
  }

  currentWaveIsFinished() {
    return (
      this.waves[this.currentWave - 1] &&
      this.waves[this.currentWave - 1].isFinished()
    );
  }

  addWave(wave) {
    this.waves.push(wave);
  }
}

export default WaveManager;
