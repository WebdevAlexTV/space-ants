import k from "../kaboom";
import Star from "./Star";

class StarManager {
  constructor() {
    this.starCooldown = 0;

    for (let i = 1; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        new Star(Math.floor(Math.random() * ((k.height() / 10) * i)));
      }
    }
  }

  onUpdate() {
    this.starCooldown -= k.dt();
    if (this.starCooldown <= 0) {
      new Star();
      this.starCooldown = 0.1;
    }
  }
}

export default StarManager;
