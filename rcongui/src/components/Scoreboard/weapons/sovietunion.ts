import { WeaponType, Team, Weapon } from "./schema";

const weapons: Weapon[] = [
  // Rifles
  // {
  //   name: "M1 GARAND",
  //   humanName: "M1 Garand",
  //   team: Team.SovietUnion,
  //   type: WeaponType.Rifle,
  // },
  // Sniper rifles
  // Pistols
  // Grenades
  // Flame throwers
  // Rocket launchers
  // Mines
  // Knives
  // Anti tank gun
  // Vehicles
  // TODO: Transport
  // TODO: Supply
  // TODO: Jeep
  // Tanks
  // Artillery
  {
    name: "122MM HOWITZER [M1938 (M-30)]",
    humanName: "122MM Howitzer [Artillery]",
    team: Team.SovietUnion,
    type: WeaponType.Artillery,
  },
];

export default weapons;
