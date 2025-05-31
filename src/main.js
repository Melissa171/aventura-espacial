import createCharacter from "../classes/Character.js";
import createSoldier from "../classes/Soldier.js";
import createEngineer from "../classes/Engineer.js";
import createPilot from "../classes/Pilot.js";
import createMedic from "../classes/Medic.js";

const roles = ["comum", "soldier", "engineer", "pilot", "medic"];
const characters = [];

const comum = document.getElementById("comum-character");
const soldier = document.getElementById("soldier-character");
const engineer = document.getElementById("engineer-character");
const pilot = document.getElementById("pilot-character");
const medic = document.getElementById("medic-character");

const render = () => {
  comum.innerHTML = "";
  soldier.innerHTML = "";
  engineer.innerHTML = "";
  pilot.innerHTML = "";
  medic.innerHTML = "";
  characters.forEach(({ name, role, level, exp, health, status, energy, powerAttack, powerDefense }) => {
    const div = document.createElement("div");
    div.className = "character-list";
    const pName = document.createElement("p");
    pName.textContent = `Nome: ${name}`;
    const pRole = document.createElement("p");
    pRole.textContent = `Role: ${role}`;
    const pLevel = document.createElement("p");
    pLevel.textContent = `Level: ${level}`;
    const pExp = document.createElement("p");
    pExp.textContent = `Exp: ${exp.toFixed(2)}`;
    const pHealth = document.createElement("p");
    pHealth.textContent = `Health: ${health.toFixed(2)}`;
    const pStatus = document.createElement("p");
    pStatus.textContent = `Status: ${status}`;
    const pEnergy = document.createElement("p");
    pEnergy.textContent = `Energy: ${energy.toFixed(2)}`;
    const pAttack = document.createElement("p");
    pAttack.textContent = `PowerAttack: ${powerAttack.toFixed(2)}`;
    const pDefense = document.createElement("p");
    pDefense.textContent = `PowerDefense: ${powerDefense.toFixed(2)}`;

    div.append(pName, pRole, pLevel, pExp, pHealth, pStatus, pEnergy, pAttack, pDefense);
    if (status === "died") div.style.borderColor = "#d10000d1";

    div.addEventListener("click", () => {
      const target = characters.find((character) => character.name === name);
      const roleVerification = target.role === "Engineer" || target.role === "Medic" ? true : false;

      const customTitle = roleVerification ? `Heal an Ally` : `Attack an enemy`;

      const customPlaceHolder = roleVerification ? `Ally name here` : `Enemy name here`;

      Swal.fire({
        title: customTitle,
        icon: "warning",
        input: "text",
        inputAttributes: {
          autocapitalize: "on",
          autocomplete: "off",
          placeholder: customPlaceHolder,
        },
        preConfirm: (character) => {
          const toAttack = characters.find((characterFind) => characterFind.name === character);
          if (!toAttack) {
            Swal.showValidationMessage("Personagem não encontrado.");
          } else {
            if (target === toAttack && !roleVerification) return Swal.showValidationMessage("Você não pode se atacar!");

            target.attack(toAttack);
            render();
          }
        },
        customClass: {
          popup: "popupClass",
        },
      });
    });

    if (role.toLowerCase() === "comum") return comum.appendChild(div);
    if (role.toLowerCase() === "soldier") return soldier.appendChild(div);
    if (role.toLowerCase() === "engineer") return engineer.appendChild(div);
    if (role.toLowerCase() === "pilot") return pilot.appendChild(div);
    if (role.toLowerCase() === "medic") return medic.appendChild(div);
  });
};

const createFunction = (name, role) => {
  switch (role.toLowerCase()) {
    case "comum":
      return new createCharacter(name);
    case "soldier":
      return new createSoldier(name);
    case "engineer":
      return new createEngineer(name);
    case "pilot":
      return new createPilot(name);
    case "medic":
      return new createMedic(name);
  }
};

document.getElementById("create-character").addEventListener("click", () => {
  Swal.fire({
    title: "Create new character",
    html: `
        <div id="lines-box">
            <div class="lineOneCNC">
                <label>Character name:</label>
                <input type="text" id="character-name" autocomplete="off" placeholder="Character name"></input>
            </div>
            <div class="lineTwoCNC">
                <label>Character role:</label>
                <p>(Roles: Comum, Engineer, Medic, Pilot and Soldier)</p>
                <input type="text" id="character-role" autocomplete="off" placeholder="Role" autocapitalize="on"></input>
            </div>
        </div>
    `,
    preConfirm: () => {
      const characterName = document.getElementById("character-name").value.trim();
      const characterRole = document.getElementById("character-role").value.trim();

      if (characterName === "" || characterRole === "") return Swal.showValidationMessage("Preencha todos os campos!");

      if (!roles.includes(characterRole.toLowerCase())) return Swal.showValidationMessage("This role doesn't exists");

      if (characters.find((character) => character.name.toLowerCase() === characterName.toLowerCase())) {
        return Swal.showValidationMessage("A character with this name already exists.");
      }
      return { name: characterName, role: characterRole };
    },
    confirmButtonText: "Create",
    customClass: {
      popup: "popupClass",
    },
  }).then(({ isConfirmed, value }) => {
    if (isConfirmed) {
      const { name, role } = value;
      characters.push(createFunction(name, role));
      console.log(createFunction(name, role));
      render();
    }
  });
});
