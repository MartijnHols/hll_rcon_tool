import { WeaponType, Team, Weapon } from "./schema";

const weapons: Weapon[] = [
  {
    name: "UNKNOWN",
    humanName: "Unknown",
    team: Team.Unknown,
    type: WeaponType.Unknown,
  },
  {
    // Probably the Russian unknown, as I only saw this on Russian maps
    name: "Unknown",
    humanName: "Unknown",
    team: Team.Unknown,
    type: WeaponType.Unknown,
  },
  // Satchel
  {
    name: "SATCHEL",
    humanName: "Satchel",
    team: Team.Unknown,
    type: WeaponType.Satchel,
  },
  {
    // Only saw this in a match with the British - might be the British name?
    name: "Satchel",
    humanName: "Satchel",
    team: Team.Unknown,
    type: WeaponType.Satchel,
  },
  {
    // Only saw this in a match with Russians - might be the Russian name?
    name: "SATCHEL CHARGE",
    humanName: "Satchel",
    team: Team.Unknown,
    type: WeaponType.Satchel,
  },
  // Commander abilities
  {
    name: "BOMBING RUN",
    humanName: "Bombing Run",
    team: Team.Unknown,
    type: WeaponType.CommanderAbility,
  },
  {
    name: "STRAFING RUN",
    humanName: "Strafing Run",
    team: Team.Unknown,
    type: WeaponType.CommanderAbility,
  },
  {
    name: "PRECISION STRIKE",
    humanName: "Precision Strike",
    team: Team.Unknown,
    type: WeaponType.CommanderAbility,
  },
];

export default weapons;
