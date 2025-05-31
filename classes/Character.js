export default class Character {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.exp = 0;
    this.role = "Comum";
    this.health = 720;
    this.status = "alive";
    this.maxHealth = 720;
    this.energy = 105;
    this.maxEnergy = 105;
    this.powerAttack = 75;
    this.powerDefense = 75;
  }

  attack(target) {
    if (this.status === "died") return;

    if (this.energy < this.powerAttack * 0.2) return console.log(`${this.name} não tem energia para atacar!`);
    if (target.status === "died") return console.log(`${target.name} já está morto.`);

    let damage = parseInt(this.powerAttack) - parseInt(target.powerDefense);
    if (damage <= 0) {
      damage = 1;
    }

    console.log(`${this.name} deferiu ${damage} de dano -> ${target.name}`);
    this.handleEnergy("decrease", this.powerAttack * 0.2);
    const isKilled = target.handleHealth("decrease", damage);
    console.log(isKilled);
    if (isKilled === "died") this.handleExp(25);
  }

  handleHealth(type, quantity) {
    if (type === "increase") {
      this.health += quantity;
      if (this.health > this.maxHealth) return (this.health = this.maxHealth);
    }

    if (type === "decrease") {
      this.health -= quantity;
      if (this.health < 0) {
        this.health = 0;
        this.status = "died";
        return "died";
      }
    }
  }

  handleEnergy(type, quantity) {
    if (type === "increase") {
      this.energy += quantity;
      if (this.energy > this.maxEnergy) return (this.energy = this.maxEnergy);
    }

    if (type === "decrease") {
      this.energy -= quantity;
      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  handleExp(exp) {
    if (this.exp + exp >= 100) {
      const difference = this.exp + exp - 100;
      this.exp = difference;
      this.levelUp();
    } else {
      this.exp += exp;
    }
  }

  levelUp() {
    this.level += 1;
    this.health *= 1.4;
    this.maxHealth *= 1.4;
    this.energy *= 1.4;
    this.maxEnergy *= 1.4;
    this.powerAttack *= 1.4;
    this.powerDefense *= 1.4;
  }
}
