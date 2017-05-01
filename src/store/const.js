/**
* Constants
*/
const image_static = 'https://www.wvwstats.com/static/img/'

/**
* URLs for API Requests
*/
export const matchesUrl = 'https://api.guildwars2.com/v2/wvw/matches?ids=all'
export const worldsUrl = 'https://api.guildwars2.com/v2/worlds?ids=all'
export const objectivesUrl = 'https://api.guildwars2.com/v2/wvw/objectives?ids='
export const guildUrl = 'https://api.guildwars2.com/v2/guild/'
export const glickoUrl = 'https://www.wvwstats.com/api/v1/officialglicko'
export const predictedGlickoUrl = 'https://www.wvwstats.com/api/v1/predictedglicko'
export const weekleaderboardUrl = 'https://www.wvwstats.com/api/v1/weekleaderboard'
export const matcharchiveUrl = 'https://www.wvwstats.com/api/v1/matcharchive'
export const timezonesUrl = 'https://www.wvwstats.com/api/v1/timezones'
export const matchHistoryUrl = 'https://wvwstats.com/api/v1/matchhistory'
export const matchUrl = 'https://wvwstats.com/api/v1/match/'
export const dataRangeUrl = 'https://wvwstats.com/api/v1/datarange'

// All Alpine Borderlands..
// const objectiveIds = [
//   '94-35', '95-35', '96-35', '94-32', '95-32', '96-32', '94-33', '95-33', '96-33',
//   '94-34', '95-34', '96-34', '94-36', '95-36', '96-36', '94-37', '95-37', '96-37',
//   '94-38', '95-38', '96-38', '94-39', '95-39', '96-39', '94-40', '95-40', '96-40',
//   '94-50', '95-50', '96-50', '94-51', '95-51', '96-51', '94-52', '95-52', '96-52',
//   '94-53', '95-53', '96-53', '38-1', '38-2', '38-3', '38-4', '38-5', '38-6',
//   '38-7', '38-8', '38-9', '38-10', '38-11', '38-12', '38-13', '38-14', '38-15',
//   '38-16', '38-17', '38-18', '38-19', '38-20', '38-21', '38-22'
// ]

// Alpine + Desert (red)
export const objectiveIds = [
  '95-35', '96-35', '95-32', '96-32', '95-33', '96-33', '95-34', '96-34',
  '95-36', '96-36', '95-37', '96-37', '95-38', '96-38', '95-39', '96-39',
  '95-40', '96-40', '95-50', '96-50', '95-51', '96-51', '95-52', '96-52',
  '95-53', '96-53', '38-1', '38-2', '38-3', '38-4', '38-5', '38-6', '38-7',
  '38-8', '38-9', '38-10', '38-11', '38-12', '38-13', '38-14', '38-15',
  '38-16', '38-17', '38-18', '38-19', '38-20', '38-21', '38-22', "1099-99",
  "1099-100", "1099-101", "1099-102", "1099-104", "1099-105", "1099-106",
  "1099-109", "1099-110", "1099-113", "1099-114", "1099-115", "1099-116"
]

export const guildUpgrades = {
  '147': {
    'static': image_static + '147.png',
    'name': 'Iron Guards'
  },
  '168': {
    'static': image_static + '168.png',
    'name': 'Cloaking Waters'
  },
  '178': {
    'static': image_static + '178.png',
    'name': 'Emergency Waypoint'
  },
  '183': {
    'static': image_static + '183.png',
    'name': 'Auto Turrets'
  },
  '222': {
    'static': image_static + '222.png',
    'name': 'Dune Roller'
  },
  '298': {
    'static': image_static + '298.png',
    'name': 'Airship Defense'
  },
  '306': {
    'static': image_static + '306.png',
    'name': 'Sabotage Depot'
  },
  '307': {
    'static': image_static + '307.png',
    'name': 'Armored Dolyaks'
  },
  '329': {
    'static': image_static + '329.png',
    'name': 'Hardened Siege'
  },
  '345': {
    'static': image_static + '345.png',
    'name': 'Centaur Banner'
  },
  '365': {
    'static': image_static + '365.png',
    'name': 'Packed Dolyaks'
  },
  '383': {
    'static': image_static + '383.png',
    'name': 'Invulnerable Dolyaks'
  },
  '389': {
    'static': image_static + '389.png',
    'name': 'Hardened Gates'
  },
  '399': {
    'static': image_static + '399.png',
    'name': 'Turtle Banner'
  },
  '418': {
    'static': image_static + '418.png',
    'name': 'Presence of the Keep'
  },
  '483': {
    'static': image_static + '483.png',
    'name': 'Minor Supply Trap'
  },
  '513': {
    'static': image_static + '513.png',
    'name': 'Invulnerable Fortifications'
  },
  '559': {
    'static': image_static + '559.png',
    'name': 'Chilling Fog'
  },
  '562': {
    'static': image_static + '562.png',
    'name': 'Speedy Dolyaks'
  },
  '583': {
    'static': image_static + '583.png',
    'name': 'Watchtower'
  },
  '590': {
    'static': image_static + '590.png',
    'name': 'Dragon Banner'
  }
}
