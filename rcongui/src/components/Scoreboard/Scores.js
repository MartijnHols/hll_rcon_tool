import React from "react";
import { List as iList, Map } from "immutable";
import {
  Grid,
  AppBar,
  Link,
  Avatar,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
  Paper,
  Divider,
  IconButton,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { pure } from "recompose";
import { PlayerStatProfile } from "./PlayerStatProfile";
import MUIDataTable from "mui-datatables";
import { Button } from "@material-ui/core";
import { toPairs, sortBy } from "lodash";
import BalanceBar from "./BalanceBar";

export const safeGetSteamProfile = (scoreObj) =>
  scoreObj.get("steaminfo")
    ? scoreObj.get("steaminfo", new Map()).get("profile")
      ? scoreObj.get("steaminfo", new Map()).get("profile")
      : new Map()
    : new Map();

const PlayerItem = pure(({ score, rank, postProcess, statKey, onClick }) => {
  const steamProfile = safeGetSteamProfile(score);
  const avatarUrl = steamProfile ? steamProfile.get("avatar", null) : null;

  const analysis = analyzePlayer(score.toJS());

  return (
    <>
      <Divider variant="middle" component="li" />
      <ListItem button onClick={onClick}>
        <ListItemAvatar>
          <Avatar src={avatarUrl}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            score.get("player") ||
            steamProfile.get(
              "personaname",
              `<missing_profile> ID: ${score.get("player_id")}`
            )
          }
          secondary={`#${rank} - ${
            analysis
              ? `${Math.round(analysis.percentageAxis * 100)}% Nazi`
              : "Unknown"
          }`}
        />
        <ListItemSecondaryAction>
          <Typography variant="h6" color="secondary">
            {postProcess(score.get(statKey))}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
});

const TopList = pure(
  ({
    iconUrl,
    scores,
    statType,
    statKey,
    reversed,
    postProcessFunc,
    onPlayerClick,
    playersFilter,
  }) => {
    const postProcess = postProcessFunc ? postProcessFunc : (val) => val;
    const defaultNum = playersFilter.size !== 0 ? 9999 : 10;
    const [top, setTop] = React.useState(defaultNum);
    const toggle = () => (top === 9999 ? setTop(defaultNum) : setTop(9999));
    const show = top === 9999 ? "Show less" : "Show all";
    const showButton = top === 9999 ? <RemoveIcon /> : <AddIcon />;
    const sortedScore = React.useMemo(() => {
      const compareFunc = reversed
        ? (a, b) => (a > b ? -1 : a === b ? 0 : 1)
        : undefined;
      if (playersFilter.size !== 0) {
        return scores.sortBy((s) => s.get(statKey), compareFunc);
      } else {
        return scores.sortBy((s) => s.get(statKey), compareFunc).slice(0, top);
      }
    }, [top, playersFilter, scores, reversed, statKey]);

    return (
      <List>
        <React.Fragment>
          <ListItem>
            <ListItemAvatar style={{ visibility: "visible" }}>
              <Avatar src={iconUrl}>#</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">name</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="h6">{statType}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
        {sortedScore.map((s, idx) =>
          playersFilter.size === 0 ||
            playersFilter.includes(
              s.get("player") ||
              s.get("steaminfo")?.get("profile")?.get("personaname")
            ) ? (
            <PlayerItem
              key={statKey + idx}
              score={s}
              rank={idx + 1}
              postProcess={postProcess}
              statKey={statKey}
              onClick={() => onPlayerClick(s)}
            />
          ) : null
        )}
        <ListItem>
          <ListItemAvatar style={{ visibility: "hidden" }}>
            <Avatar>#</Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Link onClick={toggle}>{show}</Link>} />
          <ListItemSecondaryAction>
            <IconButton onClick={toggle} color="secondary">
              {showButton}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
);

const RankBoard = pure(
  ({
    classes,
    iconUrl,
    scores,
    title,
    statType,
    statKey,
    reversed,
    postProcessFunc,
    onPlayerClick,
    playersFilter,
  }) => (
    <>
      <AppBar position="relative" style={{ minHeight: 144 }}>
        <Toolbar style={{ minHeight: "inherit" }}>
          <Typography
            variant="h2"
            align="center"
            className={classes.grow}
            display="block"
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper elevation={3}>
        <TopList
          iconUrl={iconUrl}
          scores={scores}
          statType={statType}
          statKey={statKey}
          reversed={reversed}
          postProcessFunc={postProcessFunc}
          onPlayerClick={onPlayerClick}
          playersFilter={playersFilter}
        />
      </Paper>
    </>
  )
);

const useStyles = makeStyles((theme) => ({
  black: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const RawScores = pure(({ classes, scores }) => {
  const lastState = window.localStorage.getItem("rawStats");
  const [show, setShow] = React.useState(
    lastState !== null
      ? parseInt(lastState)
      : process.env.REACT_APP_PUBLIC_BUILD
        ? 0
        : 1
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [columns, setColumns] = React.useState([
    { name: "steam_id_64", label: "Steam ID", options: { display: false } },
    { name: "player", label: "Name" },
    { name: "kills", label: "Kills" },
    { name: "deaths", label: "Deaths" },
    { name: "kill_death_ratio", label: "K/D" },
    { name: "kills_streak", label: "Max kill streak" },
    { name: "kills_per_minute", label: "Kill(s) / minute" },
    { name: "deaths_per_minute", label: "Death(s) / minute" },
    {
      name: "deaths_without_kill_streak",
      label: "Max death streak",
    },
    { name: "teamkills", label: "Max TK streak" },
    { name: "deaths_by_tk", label: "Death by TK" },
    { name: "deaths_by_tk_streak", label: "Death by TK Streak" },
    {
      name: "longest_life_secs",
      label: "(aprox.) Longest life min.",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          Math.round(parseInt(value) / 60).toFixed(2),
      },
    },
    {
      name: "shortest_life_secs",
      label: "(aprox.) Shortest life secs.",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          Math.round(parseInt(value) / 60).toFixed(2),
      },
    },
    {
      name: "death_by",
      label: "Nemesis",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const pairs = toPairs(value);
          return sortBy(pairs, (v) => -v[1]).map((v) => `${v[0]}: ${v[1]}`)[0];
        },
      },
    },
    {
      name: "most_killed",
      label: "Victim",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const pairs = toPairs(value);
          return sortBy(pairs, (v) => -v[1]).map((v) => `${v[0]}: ${v[1]}`)[0];
        },
      },
    },
    {
      name: "combat",
      label: "Combat Effectiveness",
      options: { display: false },
    },
    { name: "support", label: "Support Points", options: { display: false } },
    { name: "defense", label: "Defensive Points", options: { display: false } },
    { name: "offense", label: "Offensive Points", options: { display: false } },
    {
      name: "weapons",
      label: "Weapons",
      options: {
        customBodyRender: commaSeperatedListRenderer,
      },
    },
    {
      name: "death_by_weapons",
      label: "Death by Weapons",
      options: {
        customBodyRender: commaSeperatedListRenderer,
      },
    },
  ]);
  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            window.localStorage.setItem("rawStats", show === 0 ? 1 : 0);
            setShow(show === 0 ? 1 : 0);
          }}
          variant="outlined"
        >
          {show ? "hide" : "show"} raw stats
        </Button>
      </Grid>{" "}
      {show ? (
        <Grid item xs={12}>
          <MUIDataTable
            options={{
              filter: false,
              rowsPerPage: rowsPerPage,
              enableNestedDataAccess: ".",
              selectableRows: "none",
              rowsPerPageOptions: [10, 25, 50, 100, 250, 500, 1000],
              onChangeRowsPerPage: (v) => setRowsPerPage(v),
              onViewColumnsChange: (c, a) => {
                setColumns((cc) => {
                  const newColumns = [...cc];
                  const changedColumn = newColumns.find(
                    (column) => column.name === c
                  );
                  if (!changedColumn.options) {
                    changedColumn.options = { display: a === "add" };
                  } else {
                    changedColumn.options.display = a === "add";
                  }
                  return newColumns;
                });
              },
              onDownload: (buildHead, buildBody, columns, data) => {
                // Convert any column values that are objects to JSON so they display in the csv as data instead of [object Object]
                const expandedData = data.map((row) => {
                  return {
                    index: row.index,
                    data: row.data.map((colValue) =>
                      typeof colValue === "object"
                        ? JSON.stringify(colValue)
                        : colValue
                    ),
                  };
                });
                return buildHead(columns) + buildBody(expandedData);
              },
            }}
            data={scores ? scores.toJS() : []}
            columns={columns}
          />
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
});

function commaSeperatedListRenderer(value) {
  const pairs = toPairs(value);
  return sortBy(pairs, (v) => -v[1])
    .map((v) => `${v[0]}: ${v[1]}`)
    .join(", ");
}
const unknownWeapons = [
  "UNKNOWN",
  "SATCHEL",
  "Satchel", // Only saw this in a match with the British - might be the British name?
  "BOMBING RUN",
  "STRAFING RUN",
  "PRECISION STRIKE",
  // I think when vehicles blow up, this is the weapon that claims the kill
  "Opel Blitz (Transport)",
  "Opel Blitz (Supply)",
  "Sd.Kfz.161 Panzer IV",
  "Sd.Kfz.171 Panther",
  "Sd.Kfz.181 Tiger 1",
  "Sd.Kfz.234 Puma",
  "Sd.Kfz.121 Luchs",
  "Sd.Kfz 251 Half-track",
  "Kubelwagen",
  "GMC CCKW 353 (Transport)",
  "GMC CCKW 353 (Supply)",
  "Stuart M5A1",
  "Sherman M4A3(75)W",
  "Sherman M4A3E2(76)",
];
const isUnknownWeapon = (weapon) => unknownWeapons.includes(weapon);
const artilleryWeapons = ["150MM HOWITZER [sFH 18]", "155MM HOWITZER [M114]"];
const isArtilleryWeapon = (weapon) => artilleryWeapons.includes(weapon);
const tankWeapons = [
  // Germany
  "COAXIAL MG34 [Sd.Kfz.171 Panther]",
  "HULL MG34 [Sd.Kfz.171 Panther]", // hull is driving over someone I reckon
  "75MM CANNON [Sd.Kfz.171 Panther]",
  // Tiger
  "COAXIAL MG34 [Sd.Kfz.181 Tiger 1]",
  "HULL MG34 [Sd.Kfz.181 Tiger 1]",
  "88 KWK 36 L/56 [Sd.Kfz.181 Tiger 1]",
  // Panzer IV
  "COAXIAL MG34 [Sd.Kfz.161 Panzer IV]",
  "HULL MG34 [Sd.Kfz.161 Panzer IV]",
  "75MM CANNON [Sd.Kfz.161 Panzer IV]",
  // Puma
  "COAXIAL MG34 [Sd.Kfz.234 Puma]",
  "50mm KwK 39/1 [Sd.Kfz.234 Puma]",
  // Luchs
  "COAXIAL MG34 [Sd.Kfz.121 Luchs]",
  "20MM KWK 30 [Sd.Kfz.121 Luchs]",
  // unidentified tanks
  "HULL MG34",
  "COAXIAL MG34",
  // US
  // Greyhound
  "COAXIAL M1919 [M8 Greyhound]",
  "M6 37mm [M8 Greyhound]",
  // Stuart
  "COAXIAL M1919 [Stuart M5A1]",
  "37MM CANNON [Stuart M5A1]",
  "HULL M1919 [Stuart M5A1]",
  // 75
  "COAXIAL M1919 [Sherman M4A3(75)W]",
  "75MM CANNON [Sherman M4A3(75)W]",
  "HULL M1919 [Sherman M4A3(75)W]",
  // 76
  "COAXIAL M1919 [Sherman M4A3E2(76)]",
  "HULL M1919 [Sherman M4A3E2(76)]",
  "76MM M1 GUN [Sherman M4A3E2(76)]",
];
const isTankWeapon = (weapon) => tankWeapons.includes(weapon);
const germanWeapons = [
  "KARABINER 98K",
  "MP40",
  "STG44",
  "GEWEHR 43",
  "M43 STIELHANDGRANATE",
  "M24 STIELHANDGRANATE",
  "MG42",
  "MG 42", // this alternative spelling is used in the game, no idea why/when
  "M1A1 AT MINE",
  "150MM HOWITZER [sFH 18]",
  "FG42 x4",
  "WALTHER P38",
  "KARABINER 98K x8",
  "FLAMMENWERFER 41",
  "PANZERSCHRECK",
  "FG42",
  "MG34",
  "S-MINE", // TODO: verify whether the US AP mine isn't also listed as S-MINE kill
  "LUGER P08",
  "TELLERMINE 43",
  // Panther
  "COAXIAL MG34 [Sd.Kfz.171 Panther]",
  "HULL MG34 [Sd.Kfz.171 Panther]",
  "75MM CANNON [Sd.Kfz.171 Panther]",
  // Tiger
  "COAXIAL MG34 [Sd.Kfz.181 Tiger 1]",
  "HULL MG34 [Sd.Kfz.181 Tiger 1]",
  "88 KWK 36 L/56 [Sd.Kfz.181 Tiger 1]",
  // Panzer IV
  "COAXIAL MG34 [Sd.Kfz.161 Panzer IV]",
  "HULL MG34 [Sd.Kfz.161 Panzer IV]",
  "75MM CANNON [Sd.Kfz.161 Panzer IV]",
  // Lunchs
  "COAXIAL MG34 [Sd.Kfz.121 Luchs]",
  "20MM KWK 30 [Sd.Kfz.121 Luchs]",
  // Puma
  "COAXIAL MG34 [Sd.Kfz.234 Puma]",
  "50mm KwK 39/1 [Sd.Kfz.234 Puma]",
  "COAXIAL MG34", // unidentified tanks
  "75MM CANNON [PAK 40]", // AT gun
  "FELDSPATEN", // melee
  "Sd.Kfz 251 Half-track", // halftrack driving over someone
  "MG 42 [Sd.Kfz 251 Half-track]", // halftrack mg
  "HULL MG34", // no idea what tank this is
];
const isGermanWeapon = (weapon) => germanWeapons.includes(weapon);
const not = (func) => (value) => !func(value);
export const analyzeWeapons = (weapons) => {
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
  const germanKills = Object.keys(weapons)
    .filter(isGermanWeapon)
    .reduce((sum, weapon) => sum + weapons[weapon], 0);

  const percentageAxis = germanKills / (totalKills - unknownKills);

  return {
    percentageAxis,
    certainty: 1 - unknownKills / totalKills,
    hasSwitchedTeams: totalKills - unknownKills < germanKills,
  };
};
export const analyzePlayer = (player) => {
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

const Scores = pure(({ classes, scores, durationToHour, type }) => {
  const [highlight, setHighlight] = React.useState(null);
  const doHighlight = (playerScore) => {
    console.log(playerScore.toJS())
    setHighlight(playerScore);
    window.scrollTo(0, 0);
  };
  const [playersFilter, setPlayersFilter] = React.useState(new iList());
  const undoHighlight = () => setHighlight(null);
  const styles = useStyles();

  const totalKillsAxis = {
    artillery: 0,
    tank: 0,
    infantry: 0,
  };
  const totalKillsAllies = {
    artillery: 0,
    tank: 0,
    infantry: 0,
  };

  const debug = {};

  scores?.toJS().forEach((player) => {
    const analysis = analyzePlayer(player);
    debug[player.player] = analysis;
    if (!analysis) {
      // console.log(item.player, "has no kills");
      return;
    }

    const { percentageAxis } = analysis;
    const weapons = Object.keys(player.weapons);

    const sum = (sum, weapon) => sum + player.weapons[weapon];
    totalKillsAxis.artillery +=
      weapons.filter(isGermanWeapon).filter(isArtilleryWeapon).reduce(sum, 0) ||
      0;
    totalKillsAllies.artillery +=
      weapons
        .filter(not(isGermanWeapon))
        .filter(isArtilleryWeapon)
        .reduce(sum, 0) || 0;
    totalKillsAxis.tank +=
      weapons.filter(isGermanWeapon).filter(isTankWeapon).reduce(sum, 0) || 0;
    totalKillsAllies.tank +=
      weapons.filter(not(isGermanWeapon)).filter(isTankWeapon).reduce(sum, 0) ||
      0;
    totalKillsAxis.infantry +=
      weapons.reduce((sum, weapon) => {
        if (isArtilleryWeapon(weapon) || isTankWeapon(weapon)) {
          return sum;
        }
        if (isUnknownWeapon(weapon)) {
          return sum + Math.round(weapons[weapon] * percentageAxis);
        }
        if (!isGermanWeapon(weapon)) {
          return sum;
        }

        return sum + player.weapons[weapon];
      }, 0) || 0;
    totalKillsAllies.infantry +=
      weapons.reduce((sum, weapon) => {
        if (isArtilleryWeapon(weapon) || isTankWeapon(weapon)) {
          return sum;
        }
        if (isUnknownWeapon(weapon)) {
          return (
            sum + Math.round(player.weapons[weapon] * (1 - percentageAxis))
          );
        }
        if (isGermanWeapon(weapon)) {
          return sum;
        }

        return sum + player.weapons[weapon];
      }, 0) || 0;
  });

  // console.log({ totalKillsAxis, totalKillsAllies });

  // console.log(debug);
  // console.log(
  //   "These should be non German weapons:",
  //   Object.keys(
  //     scores
  //       ?.toJS()
  //       .map((item) => Object.keys(item.weapons))
  //       .flat()
  //       .reduce((obj, weapon) => {
  //         obj[weapon] = true;
  //         return obj;
  //       }, {})
  //   )
  //     .filter(not(isGermanWeapon))
  //     .filter(not(isUnknownWeapon))
  //     .filter(not(isTankWeapon))
  //     .filter(not(isArtilleryWeapon))
  // );

  return (
    <React.Fragment>
      {highlight && (
        <PlayerStatProfile playerScore={highlight} onClose={undoHighlight} />
      )}

      <BalanceBar axisKills={totalKillsAxis} alliesKills={totalKillsAllies} />

      {scores && scores.size ? (
        <React.Fragment>
          {process.env.REACT_APP_PUBLIC_BUILD ? (
            ""
          ) : (
            <Grid item xs={12}>
              <RawScores scores={scores} classes={classes} />{" "}
            </Grid>
          )}

          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={12}
                className={`${styles.black} ${classes.doublePadding}`}
              >
                <Paper>
                  <Autocomplete
                    multiple
                    onChange={(e, val) => setPlayersFilter(new iList(val))}
                    options={scores
                      .toJS()
                      .map(
                        (v) =>
                          v?.player || v.steaminfo?.profile?.personaname || ""
                      )}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Quickly find players by name here (start typing)"
                      />
                    )}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.doublePadding}>
            <Typography variant="caption">
              You can click on a player to see their details
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/bomb.png"}
              scores={scores}
              title="TOP KILLERS"
              statKey="kills"
              statType="kills"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/invincible.webp"}
              scores={scores}
              title="TOP RATIO"
              statType="kill/death"
              statKey="kill_death_ratio"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/efficiency.png"}
              scores={scores}
              title="TOP PERF."
              statType="kill/minute"
              statKey="kills_per_minute"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/tryhard.png"}
              scores={scores}
              title="TRY HARDERS"
              statType="death/minute"
              statKey="deaths_per_minute"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/stamina.png"}
              scores={scores}
              title="TOP STAMINA"
              statType="deaths"
              statKey="deaths"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/streak_line.png"}
              scores={scores}
              title="TOP KILL STREAK"
              statType="kill streak"
              statKey="kills_streak"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/nevergiveup.png"}
              scores={scores}
              title="I NEVER GIVE UP"
              statType="death streak"
              statKey="deaths_without_kill_streak"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/patience.png"}
              scores={scores}
              title="MOST PATIENT"
              statType="death by teamkill"
              statKey="deaths_by_tk"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/clumsy.png"}
              scores={scores}
              title="YES I'M CLUMSY"
              statType="teamkills"
              statKey="teamkills"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/glasses.png"}
              scores={scores}
              title="I NEED GLASSES"
              statType="teamkills streak"
              statKey="teamkills_streak"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/vote.ico"}
              scores={scores}
              title="I ❤ VOTING"
              statType="# vote started"
              statKey="nb_vote_started"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <RankBoard
              classes={classes}
              iconUrl={"icons/sleep.png"}
              scores={scores}
              title="What is a break?"
              statType="Ingame time"
              statKey="time_seconds"
              onPlayerClick={doHighlight}
              playersFilter={playersFilter}
              reversed
              postProcessFunc={durationToHour}
            />
          </Grid>
          <React.Fragment>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <RankBoard
                classes={classes}
                iconUrl={"icons/survivor.png"}
                scores={scores}
                title="SURVIVOR"
                statType="Longest life min."
                statKey="longest_life_secs"
                postProcessFunc={(v) => (v / 60).toFixed(2)}
                onPlayerClick={doHighlight}
                playersFilter={playersFilter}
                reversed
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <RankBoard
                classes={classes}
                iconUrl={"icons/early.png"}
                scores={scores}
                title="U'R STILL A MAN"
                statType="Shortest life min."
                statKey="shortest_life_secs"
                postProcessFunc={(v) => (v / 60).toFixed(2)}
                onPlayerClick={doHighlight}
                playersFilter={playersFilter}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <RankBoard
                classes={classes}
                iconUrl={"icons/early.png"}
                scores={scores}
                title="COMBAT SCORE"
                statType="Points"
                statKey="combat"
                onPlayerClick={doHighlight}
                playersFilter={playersFilter}
                reversed
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <RankBoard
                classes={classes}
                iconUrl={"icons/early.png"}
                scores={scores}
                title="ATTACK SCORE"
                statType="Points"
                statKey="offense"
                onPlayerClick={doHighlight}
                playersFilter={playersFilter}
                reversed
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <RankBoard
                classes={classes}
                iconUrl={"icons/early.png"}
                scores={scores}
                title="DEFENSE SCORE"
                statType="Points"
                statKey="defense"
                onPlayerClick={doHighlight}
                playersFilter={playersFilter}
                reversed
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <RankBoard
                classes={classes}
                iconUrl={"icons/early.png"}
                scores={scores}
                title="SUPPORT SCORE"
                statType="Points"
                statKey="support"
                onPlayerClick={doHighlight}
                playersFilter={playersFilter}
                reversed
              />
            </Grid>
            {process.env.REACT_APP_PUBLIC_BUILD ? (
              <Grid item xs={12}>
                <RawScores scores={scores} classes={classes} />{" "}
              </Grid>
            ) : (
              ""
            )}
          </React.Fragment>
        </React.Fragment>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h4">No stats available yet</Typography>
        </Grid>
      )}
    </React.Fragment>
  );
});

export default Scores;
