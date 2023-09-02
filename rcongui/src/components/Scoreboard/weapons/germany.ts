import { WeaponType, Team, Weapon } from "./schema";

const weapons: Weapon[] = [
  // Rifles
  {
    name: "KARABINER 98K",
    humanName: "Karabiner 98k",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  {
    name: "MP40",
    humanName: "MP40",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  {
    name: "STG44",
    humanName: "StG 44",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  {
    name: "GEWEHR 43",
    humanName: "Gewehr 43",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  {
    name: "MG42",
    humanName: "MG42",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  {
    name: "FG42",
    humanName: "FG42",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  {
    name: "MG34",
    humanName: "MG34",
    team: Team.Germany,
    type: WeaponType.Rifle,
  },
  // Sniper rifles
  {
    name: "FG42 x4",
    humanName: "FG42 x4",
    team: Team.Germany,
    type: WeaponType.RifleScoped,
  },
  {
    name: "KARABINER 98K x8",
    humanName: "Karabiner 98k x8",
    team: Team.Germany,
    type: WeaponType.RifleScoped,
  },
  // Pistols
  {
    name: "LUGER P08",
    humanName: "Luger P08",
    team: Team.Germany,
    type: WeaponType.Pistol,
  },
  {
    name: "WALTHER P38",
    humanName: "Walther P38",
    team: Team.Germany,
    type: WeaponType.Pistol,
  },
  // Grenades
  {
    name: "M43 STIELHANDGRANATE",
    humanName: "M43 Stielhandgranate",
    team: Team.Germany,
    type: WeaponType.Grenade,
  },
  {
    name: "M24 STIELHANDGRANATE",
    humanName: "M24 Stielhandgranate",
    team: Team.Germany,
    type: WeaponType.Grenade,
  },
  // Flame throwers
  {
    name: "FLAMMENWERFER 41",
    humanName: "Flammenwerfer 41",
    team: Team.Germany,
    type: WeaponType.FlameThrower,
  },
  // Rocket launchers
  {
    name: "PANZERSCHRECK",
    humanName: "Panzerschreck",
    team: Team.Germany,
    type: WeaponType.RocketLauncher,
  },
  // Mines
  {
    name: "S-MINE",
    humanName: "S-Mine",
    team: Team.Germany,
    type: WeaponType.AntiPersonelMine,
    // This sometimes registers as a kill by the opposing team. I think when the mine is shot and explodes, the explosion can take out people.
    isUnreliableKillAttribution: true,
  },
  {
    name: "TELLERMINE 43",
    humanName: "Tellermine 43",
    team: Team.Germany,
    type: WeaponType.AntiTankMine,
    // This sometimes registers as a kill by the opposing team. I think when the mine is shot and explodes, the explosion can take out people.
    isUnreliableKillAttribution: true,
  },
  // Knives
  {
    name: "FELDSPATEN",
    humanName: "Feldspaten",
    team: Team.Germany,
    type: WeaponType.Knife,
  },
  // Anti tank gun
  {
    name: "75MM CANNON [PAK 40]",
    humanName: "75mm Cannon [PAK 40]",
    team: Team.Germany,
    type: WeaponType.AntiTankGun,
  },
  // Vehicles
  {
    name: "Opel Blitz (Transport)",
    humanName: "Opel Blitz (Transport Truck)",
    team: Team.Germany,
    type: WeaponType.Truck,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "Opel Blitz (Supply)",
    humanName: "Opel Blitz (Supply)",
    team: Team.Germany,
    type: WeaponType.Truck,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "Kubelwagen",
    humanName: "Kubelwagen",
    team: Team.Germany,
    type: WeaponType.Truck,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "Sd.Kfz 251 Half-track",
    humanName: "Sd.Kfz 251 Half-track",
    team: Team.Germany,
    type: WeaponType.HalfTrack,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "MG 42 [Sd.Kfz 251 Half-track]",
    humanName: "MG 42 [Sd.Kfz 251 Half-track]",
    team: Team.Germany,
    type: WeaponType.HalfTrack,
  },
  // Tanks
  {
    name: "Sd.Kfz.171 Panther",
    humanName: "Sd.Kfz.171 Panther",
    team: Team.Germany,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "COAXIAL MG34 [Sd.Kfz.171 Panther]",
    humanName: "Coaxial MG34 [Sd.Kfz.171 Panther]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "HULL MG34 [Sd.Kfz.171 Panther]",
    humanName: "Hull MG34 [Sd.Kfz.171 Panther]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "75MM CANNON [Sd.Kfz.171 Panther]",
    humanName: "75mm Cannon [Sd.Kfz.171 Panther]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "Sd.Kfz.181 Tiger 1",
    humanName: "Sd.Kfz.181 Tiger 1",
    team: Team.Germany,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "COAXIAL MG34 [Sd.Kfz.181 Tiger 1]",
    humanName: "Coaxial MG34 [Sd.Kfz.181 Tiger 1]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "HULL MG34 [Sd.Kfz.181 Tiger 1]",
    humanName: "Hull MG34 [Sd.Kfz.181 Tiger 1]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "88 KWK 36 L/56 [Sd.Kfz.181 Tiger 1]",
    humanName: "88 KWK 36 L/56 [Sd.Kfz.181 Tiger 1]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "Sd.Kfz.161 Panzer IV",
    humanName: "Sd.Kfz.161 Panzer IV",
    team: Team.Germany,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "COAXIAL MG34 [Sd.Kfz.161 Panzer IV]",
    humanName: "Coaxial MG34 [Sd.Kfz.161 Panzer IV]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "HULL MG34 [Sd.Kfz.161 Panzer IV]",
    humanName: "Hull MG34 [Sd.Kfz.161 Panzer IV]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "75MM CANNON [Sd.Kfz.161 Panzer IV]",
    humanName: "75mm Cannon [Sd.Kfz.161 Panzer IV]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "Sd.Kfz.234 Puma",
    humanName: "Sd.Kfz.234 Puma",
    team: Team.Germany,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "COAXIAL MG34 [Sd.Kfz.234 Puma]",
    humanName: "Coaxial MG34 [Sd.Kfz.234 Puma]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "50mm KwK 39/1 [Sd.Kfz.234 Puma]",
    humanName: "50mm KwK 39/1 [Sd.Kfz.234 Puma]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "Sd.Kfz.121 Luchs",
    humanName: "Sd.Kfz.121 Luchs",
    team: Team.Germany,
    type: WeaponType.Tank,
    isUnreliableKillAttribution: true, // These are the weapon when driving over people, but it may also sometimes be registered as killing people from the own team. Perhaps the explosion of the vehicle?
  },
  {
    name: "COAXIAL MG34 [Sd.Kfz.121 Luchs]",
    humanName: "Coaxial MG34 [Sd.Kfz.121 Luchs]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "20MM KWK 30 [Sd.Kfz.121 Luchs]",
    humanName: "20mm KWK 30 [Sd.Kfz.121 Luchs]",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "COAXIAL MG34",
    humanName: "Coaxial MG34",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  {
    name: "HULL MG34",
    humanName: "Hull MG34",
    team: Team.Germany,
    type: WeaponType.Tank,
  },
  // Artillery
  {
    name: "150MM HOWITZER [sFH 18]",
    humanName: "150mm Howitzer [Artillery]",
    team: Team.Germany,
    type: WeaponType.Artillery,
  },
  // Weird stuff:
  {
    // this alternative spelling is used in the game, no idea why/when, may be a tank weapon (perhaps if the kill is registered after the tank is blown up)
    name: "MG 42",
    humanName: "MG42",
    team: Team.Germany,
    type: WeaponType.Unknown,
  },
];

export default weapons;
