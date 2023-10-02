const artilleryColor = "red";
const tanksColor = "brown";
const axisInfantryColor = "#de6069";
const alliesInfantryColor = "#346888";
export const axisColor = "red";
export const alliesColor = "blue";

const BalanceBar = ({ axisKills, alliesKills }) => {
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
            >
              Artillery ({axisKills.artillery})
            </div>
            <div
              style={{
                width: (axisKills.tank / totalAxisKills) * 100 + "%",
                background: tanksColor,
              }}
            >
              Tanks ({axisKills.tank})
            </div>
            <div
              style={{
                width: (axisKills.infantry / totalAxisKills) * 100 + "%",
                background: axisInfantryColor,
              }}
            >
              Infantry ({axisKills.infantry})
            </div>
          </div>
          <div>
            Axis ({totalAxisKills} /{" "}
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
            >
              Infantry ({alliesKills.infantry})
            </div>
            <div
              style={{
                width: (alliesKills.tank / totalAlliesKills) * 100 + "%",
                background: tanksColor,
              }}
            >
              Tanks ({alliesKills.tank})
            </div>
            <div
              style={{
                width: (alliesKills.artillery / totalAlliesKills) * 100 + "%",
                background: artilleryColor,
              }}
            >
              Artillery ({alliesKills.artillery})
            </div>
          </div>
          <div>
            Allies ({totalAlliesKills} /{" "}
            {(totalAlliesKills / totalAxisKills).toFixed(2)} KD /{" "}
            {differencePercentage(alliesDifference)})
          </div>
        </div>
      </div>
    </div>
  );
};
export default BalanceBar;
