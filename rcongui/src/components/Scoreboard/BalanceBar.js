import { List as iList } from "immutable";
import analyzePlayer, {isAxisWeapon, isTankWeapon, isArtilleryWeapon, isUnreliableKillAttribution, not} from "./analysis/analyzePlayer";

const artilleryColor = "red";
const tanksColor = "brown";
const axisInfantryColor = "#de6069";
const alliesInfantryColor = "#346888";
export const axisColor = "red";
export const alliesColor = "blue";

const teamIconStyle = { height: "1.2em", verticalAlign: "middle" };
const GermanyIcon = () => (
  <img src="icons/germany.webp" style={teamIconStyle} />
);
const UnitedStatesIcon = () => (
  <img src="icons/unitedstates.webp" style={teamIconStyle} />
);

const BalanceBar = ({ axisKills, alliesKills, scores, setPlayersFilter }) => {
  const totalAxisKills =
    axisKills.artillery + axisKills.tank + axisKills.infantry;
  const totalAlliesKills =
    alliesKills.artillery + alliesKills.tank + alliesKills.infantry;
  const totalKillsAll = totalAxisKills + totalAlliesKills;

  const differencePercentage = (difference) =>
    `${difference > 0 ? "+" : ""}${Math.round(difference * 100)}%`;

  // I calculated it this way because I wanted the real difference in strength
  // between the two teams to be clearer as the bars can make it appear smaller
  // than it is. By using the minimum of the two teams as the denominator, the 
  // difference is more pronounced, showing more clearly how many more kills one
  // team has than the other relatively. This matches what you would see if you
  // put the bars underneath each other; the bigger bar would be the difference
  // calculated below-bigger than the smaller bar.
  const axisDifference =
    (totalAxisKills - totalAlliesKills) /
    Math.min(totalAxisKills, totalAlliesKills);
  const alliesDifference =
    (totalAlliesKills - totalAxisKills) /
    Math.min(totalAxisKills, totalAlliesKills);

  // scores.filter()

  const findPlayers = (team, role) => {
    return scores.filter((player) => {
      const analysis = analyzePlayer(player);
      if (!analysis) {
        return;
      }

      return (team === 'axis' && analysis.percentageAxis > 0) || (team === 'allies' && analysis.percentageAxis < 1);
    })
  }

  return (
    <div
      style={{
        width: "calc(100% - 16px)",
        position: "relative",
        paddingTop: "2em",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          paddingBottom: 4,
        }}
      >
        Perfect Balance
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            border: "solid currentColor",
            borderWidth: "0 3px 3px 0",
            display: "inline-block",
            padding: 3,
            transform: "translateX(-50%) rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -64,
            height: 60,
            left: "50%",
            width: 1,
            background: "currentColor",
            display: "inline-block",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div
        style={{
          width: "100%",
          background: "black",
          marginBottom: 8,
          display: "flex",
        }}
      >
        <div
          style={{
            width: (totalAxisKills / totalKillsAll) * 100 + "%",
            display: "flex",
            flexFlow: "column",
            background: axisColor,
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: (axisKills.artillery / totalAxisKills) * 100 + "%",
                background: artilleryColor,
              }}
              onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).filter(isAxisWeapon).some(isArtilleryWeapon)).map(player => player.player)))}
            >
              Artillery ({axisKills.artillery})
            </div>
            <div
              style={{
                width: (axisKills.tank / totalAxisKills) * 100 + "%",
                background: tanksColor,
              }}
              onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).filter(isAxisWeapon).some(isTankWeapon)).map(player => player.player)))}
            >
              Tanks ({axisKills.tank})
            </div>
            <div
              style={{
                width: (axisKills.infantry / totalAxisKills) * 100 + "%",
                background: axisInfantryColor,
              }}
              onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).filter(isAxisWeapon).filter(not(isArtilleryWeapon)).some(not(isTankWeapon))).map(player => player.player)))}
            >
              Infantry ({axisKills.infantry})
            </div>
          </div>
          <div
            onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).some(isAxisWeapon)).map(player => player.player)))}
          >
            <GermanyIcon /> Axis ({totalAxisKills} kills /{" "}
            {(totalAxisKills / totalAlliesKills).toFixed(2)} KD /{" "}
            {differencePercentage(axisDifference)})
          </div>
        </div>
        <div
          style={{
            width: (totalAlliesKills / totalKillsAll) * 100 + "%",
            display: "flex",
            flexFlow: "column",
            background: alliesColor,
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: (alliesKills.infantry / totalAlliesKills) * 100 + "%",
                background: alliesInfantryColor,
              }}
              onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).filter(not(isAxisWeapon)).filter(not(isArtilleryWeapon)).some(not(isTankWeapon))).map(player => player.player)))}
            >
              Infantry ({alliesKills.infantry})
            </div>
            <div
              style={{
                width: (alliesKills.tank / totalAlliesKills) * 100 + "%",
                background: tanksColor,
              }}
              onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).filter(not(isAxisWeapon)).some(isTankWeapon)).map(player => player.player)))}
            >
              Tanks ({alliesKills.tank})
            </div>
            <div
              style={{
                width: (alliesKills.artillery / totalAlliesKills) * 100 + "%",
                background: artilleryColor,
              }}
              onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).filter(not(isAxisWeapon)).some(isArtilleryWeapon)).map(player => player.player)))}
            >
              Artillery ({alliesKills.artillery})
            </div>
          </div>
          <div
            onClick={() => setPlayersFilter(new iList(scores.filter(player => Object.keys(player.weapons).filter(not(isUnreliableKillAttribution)).some(not(isAxisWeapon))).map(player => player.player)))}
          >
            <UnitedStatesIcon /> Allies ({totalAlliesKills} kills /{" "}
            {(totalAlliesKills / totalAxisKills).toFixed(2)} KD /{" "}
            {differencePercentage(alliesDifference)})
          </div>
        </div>
      </div>
    </div>
  );
};
export default BalanceBar;
