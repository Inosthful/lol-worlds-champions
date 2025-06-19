import type { Team } from "../types";

export const teamsData: Record<string, Team> = {
  fnatic: {
    id: "fnatic",
    name: "Fnatic",
    region: "LEC",
    founded: 2004,
  },
  tpa: {
    id: "tpa",
    name: "Taipei Assassins",
    region: "LMS",
    founded: 2012,
    disbanded: true,
  },
  ssw: {
    id: "ssw",
    name: "Samsung White",
    region: "LCK",
    founded: 2010,
    disbanded: true,
  },
  skt: {
    id: "skt",
    name: "T1",
    region: "LCK",
    founded: 2013,
  },
  ssg: {
    id: "ssg",
    name: "Samsung Galaxy",
    region: "LCK",
    founded: 2013,
    disbanded: true,
  },
  ig: {
    id: "ig",
    name: "Invictus Gaming",
    region: "LPL",
    founded: 2011,
  },
  fpx: {
    id: "fpx",
    name: "FunPlus Phoenix",
    region: "LPL",
    founded: 2017,
  },
  dwg: {
    id: "dwg",
    name: "DAMWON KIA",
    region: "LCK",
    founded: 2017,
  },
  edg: {
    id: "edg",
    name: "Edward Gaming",
    region: "LPL",
    founded: 2013,
  },
  drx: {
    id: "drx",
    name: "DRX",
    region: "LCK",
    founded: 2018,
  },
};
