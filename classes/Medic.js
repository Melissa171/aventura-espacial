import Character from "./Character.js";

export default class Medic extends Character {
  constructor(name) {
    super(name);
    this.role = "Medic";
    this.health = 775;
    this.maxHealth = 775;
    this.energy = 450;
    this.maxEnergy = 450;
    this.powerAttack = 60;
    this.powerDefense = 75;
    this.healingSkill = 120;
  }

  attack(target) {
    if (this.status === "died") return;
    if (this.energy < this.powerAttack * 0.2) return console.log(`${this.name} não tem energia para curar!`);

    if (target.status === "died") return console.log(`${target.name} já está morto.`);

    console.log(`${this.name} curou ${this.healingSkill} de hp -> ${target.name}`);
    this.handleEnergy("decrease", this.powerAttack * 0.2);
    return target.handleHealth("increase", this.healingSkill);
  }
}
