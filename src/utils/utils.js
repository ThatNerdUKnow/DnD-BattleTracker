
const attackTypes = {
    m: "Melee Attack",
    r: "Ranged Attack",
    "m,r": "Melee or Ranged Attack",
    mw: "Melee Weapon Attack",
    rw: "Ranged Weapon Attack",
    ms: "Melee Spell Attack",
    rs: "Ranged Spell Attack",
    "mw,rw": "Melee/Ranged Weapon"
}



const xpChart = {
    "0": 10,
    "1/8": 25,
    "1/4": 50,
    "1/2": 100,
    "1": 200,
    "2": 450,
    "3": 700,
    "4": 1100,
    "5": 1800,
    "6": 2300,
    "7": 2900,
    "8": 3900,
    "9": 5000,
    "10": 5900,
    "11": 7200,
    "12": 8400,
    "13": 10000,
    "14": 11500,
    "15": 13000,
    "16": 13000,
    "17": 15000,
    "18": 18000,
    "19": 20000,
    "20": 25000,
    "21": 33000,
    "22": 41000,
    "23": 50000,
    "24": 62000,
    "25": 75000,
    "26": 90000,
    "27": 105000,
    "28": 120000,
    "29": 135000,
    "30": 155000,

}

function xpMultiplier(enemies) {
    const multipliers = {
        "0": 0,
        "1": 1,
        "2": 1.5,
        "3-6": 2,
        "7-10": 2.5,
        "11-14": 3,
        "15+": 4
    }

    if (enemies == 0) { return multipliers["0"] }
    else if (enemies == 1) { return multipliers["1"] }
    else if (enemies == 2) { return multipliers["2"] }
    else if (enemies >= 3 && enemies <= 6) { return multipliers["3-6"] }
    else if (enemies >= 7 && enemies <= 10) { return multipliers["7-10"] }
    else if (enemies >= 11 && enemies <= 14) { return multipliers["11-14"] }
    else if (enemies >= 15) { return multipliers["15+"] }


}
module.exports = { attackTypes, xpChart, xpMultiplier }