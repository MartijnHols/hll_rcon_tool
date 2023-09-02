import { WeaponType, Team, Weapon } from "./schema";

const weapons: Weapon[] = [
  // Rifles
  {
    name: "M1 GARAND",
    humanName: "M1 Garand",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  {
    name: "M1 CARBINE",
    humanName: "M1 Carbine",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  {
    name: "M1A1 THOMPSON",
    humanName: "M1A1 Thompson",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  {
    name: "BROWNING M1919",
    humanName: "Browning M1919",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  {
    name: "M3 GREASE GUN",
    humanName: "M3 Grease Gun",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  {
    name: "M97 TRENCH GUN",
    humanName: "M97 Trench Gun",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  {
    name: "M1918A2 BAR",
    humanName: "M1918A2 BAR",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  // Sniper rifles
  {
    name: "M1903 SPRINGFIELD",
    humanName: "M1903 Springfield",
    team: Team.UnitedStates,
    type: WeaponType.Rifle,
  },
  // Pistols
  {
    name: "COLT M1911",
    humanName: "Colt M1911",
    team: Team.UnitedStates,
    type: WeaponType.Pistol,
  },
  // Grenades
  {
    name: "MK2 GRENADE",
    humanName: "MK2 Grenade",
    team: Team.UnitedStates,
    type: WeaponType.Grenade,
  },
  // Flame throwers
  {
    name: "M2 FLAMETHROWER",
    humanName: "M2 Flamethrower",
    team: Team.UnitedStates,
    type: WeaponType.FlameThrower,
  },
  // Rocket launchers
  {
    name: "BAZOOKA",
    humanName: "Bazooka",
    team: Team.UnitedStates,
    type: WeaponType.RocketLauncher,
  },
  // Mines
  {
    name: "M2 AP MINE",
    humanName: "M2 AP Mine",
    team: Team.UnitedStates,
    type: WeaponType.AntiPersonelMine,
    // This sometimes registers as a kill by the opposing team. I think when the mine is shot and explodes, the explosion can take out people.
    isUnreliableKillAttribution: true,
  },
  {
    name: "M1A1 AT MINE",
    humanName: "M1A1 AT Mine",
    team: Team.UnitedStates,
    type: WeaponType.AntiTankMine,
    // This sometimes registers as a kill by the opposing team. I think when the mine is shot and explodes, the explosion can take out people.
    isUnreliableKillAttribution: true,
  },
  // Knives
  {
    name: "M3 KNIFE",
    humanName: "M3 Knife",
    team: Team.UnitedStates,
    type: WeaponType.Knife,
  },
  // Anti tank gun
  {
    name: "57MM CANNON [M1 57mm]",
    humanName: "57MM CANNON [M1 57mm]",
    team: Team.UnitedStates,
    type: WeaponType.AntiTankGun,
  },
  // Vehicles
  {
    name: "GMC CCKW 353 (Transport)",
    humanName: "GMC CCKW 353 (Transport)",
    team: Team.UnitedStates,
    type: WeaponType.Truck,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "GMC CCKW 353 (Supply)",
    humanName: "GMC CCKW 353 (Supply)",
    team: Team.UnitedStates,
    type: WeaponType.Truck,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  // TODO: Jeep
  // Tanks
  {
    name: "Sherman M4A3(75)W",
    humanName: "Sherman M4A3(75)W",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "HULL M1919 [Sherman M4A3(75)W]",
    humanName: "HULL M1919 [Sherman M4A3(75)W]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "COAXIAL M1919 [Sherman M4A3(75)W]",
    humanName: "COAXIAL M1919 [Sherman M4A3(75)W]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "75MM CANNON [Sherman M4A3(75)W]",
    humanName: "75MM CANNON [Sherman M4A3(75)W]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "Sherman M4A3E2(76)",
    humanName: "Sherman M4A3E2(76)",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "HULL M1919 [Sherman M4A3E2(76)]",
    humanName: "HULL M1919 [Sherman M4A3E2(76)]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "COAXIAL M1919 [Sherman M4A3E2(76)]",
    humanName: "COAXIAL M1919 [Sherman M4A3E2(76)]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "76MM M1 GUN [Sherman M4A3E2(76)]",
    humanName: "76MM M1 GUN [Sherman M4A3E2(76)]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "Stuart M5A1",
    humanName: "Stuart M5A1",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "HULL M1919 [Stuart M5A1]",
    humanName: "HULL M1919 [Stuart M5A1]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "COAXIAL M1919 [Stuart M5A1]",
    humanName: "COAXIAL M1919 [Stuart M5A1]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "37MM CANNON [Stuart M5A1]",
    humanName: "37MM CANNON [Stuart M5A1]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "M8 Greyhound",
    humanName: "M8 Greyhound",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "COAXIAL M1919 [M8 Greyhound]",
    humanName: "COAXIAL M1919 [M8 Greyhound]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "M6 37mm [M8 Greyhound]",
    humanName: "M6 37mm [M8 Greyhound]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    // this alternative spelling is used in the game, no idea why/when, may be a tank weapon (perhaps if the kill is registered after the tank is blown up)
    name: "COAXIAL M1919",
    humanName: "COAXIAL M1919",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  // Weird stuff:
  {
    // this alternative spelling is used in the game, no idea why/when, may be a tank weapon (perhaps if the kill is registered after the tank is blown up)
    name: "HULL M1919",
    humanName: "COAXIAL M1919",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "COAXIAL M1919 [Sherman M4A3E2]", // I don't know what tank this is as I have seen the named 75 and 75 in logs as well
    humanName: "COAXIAL M1919 [Sherman M4A3E2]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "HULL M1919 [Sherman M4A3E2]",
    humanName: "HULL M1919 [Sherman M4A3E2]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  {
    name: "75MM M3 GUN [Sherman M4A3E2]",
    humanName: "75MM M3 GUN [Sherman M4A3E2]",
    team: Team.UnitedStates,
    type: WeaponType.Tank,
  },
  // Artillery
  {
    name: "155MM HOWITZER [M114]",
    humanName: "155MM Howitzer [Artillery]",
    team: Team.UnitedStates,
    type: WeaponType.Artillery,
  },
];

export default weapons;
