import weapons from "../weapons";
import { Team, Weapon, WeaponId, WeaponType } from "../weapons/schema";

type WeaponKills = Record<WeaponId, number>;
interface Player {
  weapons: WeaponKills;
  death_by_weapons: WeaponKills;
}

const weaponsById = weapons.reduce((map, weapon) => {
  map[weapon.name] = weapon;
  return map;
}, {} as Record<WeaponId, Weapon>);

export const isUnknownWeapon = (id: WeaponId) =>
  !weaponsById[id] ||
  weaponsById[id].isUnreliableKillAttribution ||
  weaponsById[id].team === Team.Unknown;
export const isAxisWeapon = (id: WeaponId) => {
  const weapon = weaponsById[id];

  return (
    weapon &&
    weapon.team === Team.Germany &&
    !weapon.isUnreliableKillAttribution
  );
};
const weaponInfo = (weapon) => weapons.find((item) => item.name === weapon);
export const isUnreliableKillAttribution = (weapon) =>
  weaponInfo(weapon)?.isUnreliableKillAttribution || weaponInfo(weapon)?.team === Team.Unknown;
export const isArtilleryWeapon = (weapon) =>
  weaponInfo(weapon)?.type === WeaponType.Artillery;
export const isTankWeapon = (weapon) => weaponInfo(weapon)?.type === WeaponType.Tank;
export const isGermanWeapon = (weapon) => weaponInfo(weapon)?.team === Team.Germany;
export const not = (func) => (value) => !func(value);

export const analyzeWeapons = (weapons: WeaponKills) => {
  const totalKills = Object.values(weapons).reduce(
    (sum, count) => sum + count,
    0
  );
  if (totalKills === 0) {
    return null;
  }

  const unknownKills = Object.keys(weapons)
    .filter(isUnknownWeapon)
    .reduce((sum, weapon) => sum + weapons[weapon], 0);
  const confirmedGermanKills = Object.keys(weapons)
    .filter(isAxisWeapon)
    .reduce((sum, weapon) => sum + weapons[weapon], 0);
  if (!confirmedGermanKills) {
    return null;
  }

  const percentageAxis = confirmedGermanKills / (totalKills - unknownKills);

  return {
    percentageAxis,
    certainty: 1 - unknownKills / totalKills,
    hasSwitchedTeams: totalKills - unknownKills < confirmedGermanKills,
  };
};
const analyzePlayer = (player: Player) => {
  const killsAnalysis = player.weapons && analyzeWeapons(player.weapons);
  const deathsAnalysis =
    player.death_by_weapons && analyzeWeapons(player.death_by_weapons);

  if (killsAnalysis && deathsAnalysis) {
    return {
      percentageAxis:
        (killsAnalysis.percentageAxis + 1 - deathsAnalysis.percentageAxis) / 2,
      certainty: (killsAnalysis.certainty + deathsAnalysis.certainty) / 2,
      hasSwitchedTeams:
        killsAnalysis.hasSwitchedTeams || deathsAnalysis.hasSwitchedTeams,
    };
  }

  if (killsAnalysis) {
    return {
      percentageAxis: killsAnalysis.percentageAxis,
      certainty: killsAnalysis.certainty,
      hasSwitchedTeams: killsAnalysis.hasSwitchedTeams,
    };
  }
  if (deathsAnalysis) {
    return {
      percentageAxis: 1 - deathsAnalysis.percentageAxis,
      certainty: deathsAnalysis.certainty,
      hasSwitchedTeams: deathsAnalysis.hasSwitchedTeams,
    };
  }

  return {
    percentageAxis: 0,
    certainty: 0,
    hasSwitchedTeams: false,
  };
};

export default analyzePlayer;
