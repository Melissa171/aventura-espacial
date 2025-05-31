import Character from "./Character.js";

export default class Soldier extends Character {
  constructor(name) {
    super(name);
    this.role = "Soldier";
    this.health = 1115;
    this.maxHealth = 1115;
    this.energy = 520;
    this.maxEnergy = 520;
    this.powerAttack = 120;
    this.powerDefense = 105;
    this.shield = 50;
  }

  attack(target) {
    if (this.status === "died") return;
    if (this.energy < this.powerAttack * 0.2) return console.log(`${this.name} não tem energia para atacar!`);
    if (target.status === "died") return console.log(`${target.name} já está morto.`);

    let damage = parseInt(this.powerAttack) + this.shield - parseInt(target.powerDefense);
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
      const finalDamage = Math.max(quantity - this.shield, 1);
      this.health -= finalDamage;

      if (this.health < 0) {
        this.health = 0;
        this.status = "died";
        return "died";
      }
    }
  }
}
