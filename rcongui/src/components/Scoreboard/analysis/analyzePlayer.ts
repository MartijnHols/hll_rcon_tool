import weapons from "../weapons";
import { Team, Weapon, WeaponId } from "../weapons/schema";

type WeaponKills = Record<WeaponId, number>;
interface Player {
  weapons: WeaponKills;
  death_by_weapons: WeaponKills;
}

const weaponsById = weapons.reduce((map, weapon) => {
  map[weapon.name] = weapon;
  return map;
}, {} as Record<WeaponId, Weapon>);

export const analyzeWeapons = (weapons: WeaponKills) => {
  const totalKills = Object.values(weapons).reduce(
    (sum, count) => sum + count,
    0
  );
  if (totalKills === 0) {
    return null;
  }

  const unknownKills = Object.keys(weapons)
    .filter(
      (id: WeaponId) =>
        !weaponsById[id] || weaponsById[id]?.isUnreliableKillAttribution
    )
    .reduce((sum, weapon) => sum + weapons[weapon], 0);
  const confirmedGermanKills = Object.keys(weapons)
    .filter((id: WeaponId) => {
      const weapon = weaponsById[id];

      return (
        weapon &&
        weapon.team === Team.Germany &&
        !weapon.isUnreliableKillAttribution
      );
    })
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
  const killsAnalysis = analyzeWeapons(player.weapons);
  const deathsAnalysis = analyzeWeapons(player.death_by_weapons);

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

  return null;
};

export default analyzePlayer;
