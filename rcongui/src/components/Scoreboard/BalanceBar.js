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
          <div>Axis ({totalAxisKills})</div>
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
          <div>Allies ({totalAlliesKills})</div>
        </div>
      </div>
    </div>
  );
};
export default BalanceBar;
