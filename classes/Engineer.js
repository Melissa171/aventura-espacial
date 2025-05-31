import Character from "./Character.js";

export default class Engineer extends Character {
  constructor(name) {
    super(name);
    this.role = "Engineer";
    this.health = 650;
    this.maxHealth = 650;
    this.energy = 400;
    this.maxEnergy = 400;
    this.powerAttack = 67.5;
    this.powerDefense = 82.5;
    this.healingEnergySkill = 127.5;
  }

  attack(target) {
    if (this.status === "died") return;
    if (this.energy < this.powerAttack * 0.2) return console.log(`${this.name} não tem energia para curar!`);

    if (target.status === "died") return console.log(`${target.name} já está morto.`);

    console.log(`${this.name} curou ${this.healingEnergySkill} de energia -> ${target.name}`);
    this.handleEnergy("decrease", this.powerAttack * 0.2);
    return target.handleEnergy("increase", this.healingEnergySkill);
  }
}
