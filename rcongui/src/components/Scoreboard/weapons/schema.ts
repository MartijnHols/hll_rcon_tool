export enum Team {
  Germany = "GERMANY",
  UnitedStates = "UNITED_STATES",
  SovietUnion = "SOVIET_UNION",
  British = "BRITISH",
  Unknown = "UNKNOWN",
}

export enum WeaponType {
  Rifle = "RIFLE",
  RifleScoped = "RIFLE_SCOPED",
  Pistol = "PISTOL",
  RocketLauncher = "ROCKET_LAUNCHER",
  AntiPersonelMine = "ANTI_PERSONEL_MINE",
  AntiTankMine = "ANTI_TANK_MINE",
  Grenade = "GRENADE",
  Satchel = "SATCHEL",
  Knife = "KNIFE",
  FlameThrower = "FLAME_THROWER",
  Tank = "TANK",
  HalfTrack = "HALF_TRACK",
  Truck = "TRUCK",
  AntiTankGun = "ANTI_TANK_GUN",
  Artillery = "ARTILLERY",
  CommanderAbility = "COMMANDER_ABILITY",
  Unknown = "UNKNOWN",
}

export type WeaponId = string;
export interface Weapon {
  name: WeaponId; // TODO: Rename to id
  humanName: string;
  // TODO: icon
  team: Team;
  type: WeaponType;
  /**
   * When true, this marks the weapon as having an unreliable kill attribution reason.
   * This means it can be logged as a weapon that killed someone, by either team.
   * For instance, when a vehicle explodes, the kill is sometimes attributed to the vehicle rather than the RPG.
   */
  isUnreliableKillAttribution?: boolean;
}
