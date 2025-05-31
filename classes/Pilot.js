import Character from "./Character.js";

export default class Pilot extends Character {
  constructor(name) {
    super(name);
    this.role = "Pilot";
    this.health = 920;
    this.maxHealth = 920;
    this.energy = 610;
    this.maxEnergy = 610;
    this.powerAttack = 90;
    this.powerDefense = 60;
    this.pilotSkills = 135;
  }

  attack(target) {
    if (this.status === "died") return;
    if (this.energy < this.powerAttack * 0.2) return console.log(`${this.name} não tem energia para atacar!`);
    if (target.status === "died") return console.log(`${target.name} já está morto.`);

    const realDamage = this.powerAttack + this.pilotSkills;
    let damage = realDamage * 1.5 - parseInt(target.powerDefense);
    if (damage <= 0) {
      damage = 1;
    }

    console.log(`${this.name} deferiu ${damage} de dano -> ${target.name}`);
    this.handleEnergy("decrease", this.powerAttack * 0.2);
    const isKilled = target.handleHealth("decrease", damage);
    console.log(isKilled);
    if (isKilled === "died") this.handleExp(25);
    console.log(this.exp);
  }
}
