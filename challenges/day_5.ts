import { textToArray, rowToColumn, stringToInt } from "../utils/index.js";


const testInput = [
"    [D]",    
"[N] [C]", 
"[Z] [M] [P]",
" 1   2   3 ",
"",
"move 1 from 2 to 1",
"move 3 from 1 to 3",
"move 2 from 2 to 1",
"move 1 from 1 to 2"
]
// const input = testInput;
const input = textToArray('day_5_input.txt');


function getCrates(fullInputArray: string[]): string[][] {
    const crateStringArray = fullInputArray.filter(str => {
      return  str !== "" && !str.includes('move');
    })

    const crateColumnStringArrays = rowToColumn(crateStringArray);
    const crates = crateColumnStringArrays.filter(arr => {
        return !arr.every(el => el === ' ') && !arr.includes('[') && !arr.includes(']');
    });
   
    let filteredCrates = [];
    crates.forEach(crate => {
      const temp = crate.filter(el => { 
          return el != undefined && el !== ' '
        });
        if (temp.length) filteredCrates.push(temp);
    });
    return filteredCrates;
}

const getNumFromArr = (arr: string[]): number => {
    return stringToInt(arr[0]);
}

type ProcedureType = { move: number, from: number, to: number };

function getProcedure(arr: string[]): ProcedureType[] {
    const unparsedProcedure = input.slice(input.indexOf("")+1);
    const procedure = [];
    for (let i = 0; i < unparsedProcedure.length; i++) {
        const el = unparsedProcedure[i]
        const move = el.slice(0, el.indexOf('f')-1).match(/\d+/g);
        const from = el.slice(el.indexOf('f'), el.indexOf('t') -1).match(/\d+/g);
        const to = el.slice(el.indexOf('t')).match(/\d+/g);
        procedure.push({ 
            move: getNumFromArr(move), 
            from: getNumFromArr(from), 
            to: getNumFromArr(to),
        });
    }

    return procedure;
}

function moveCratesWith9000(crates: string[][], procedure: ProcedureType ): string[][] {
    const { move, from, to } = procedure; // 1, 2, 1

    for (let i = 1; i <= move; i++) {
        const cratesFromRow = crates[from-1];
        const movingCrates = cratesFromRow.shift();
        crates[to-1].unshift(movingCrates)
    }

    return crates;
}

function moveCratesWith9001(crates: string[][], procedure: ProcedureType ): string[][] {
    const { move, from, to } = procedure; // 1, 2, 1
    let movingCrates = []
    for (let i = 1; i <= move; i++) {
        const cratesFromRow = crates[from-1]; // 'D', 'C', 'M', '2'
        const crate = cratesFromRow.shift(); // 'D' -> 'C', 'M', '2'
        movingCrates.push(crate);// ['D'];
    }

    const crateToRow = crates[to-1];
    crateToRow.unshift(...movingCrates);
    movingCrates = [];

    return crates;
}

function findTopCrates(craneModel: '9000' | '9001'): string {
    let crates = getCrates(input);
    const procedure = getProcedure(input);
    procedure.forEach(procedure => {
        if (craneModel === '9000') {
            crates = moveCratesWith9000(crates, procedure);
        }
        if (craneModel === '9001') {
            crates = moveCratesWith9001(crates, procedure);
        }
    })
    const topCrates = crates.map(crateStack => crateStack[0]).join('');;

    console.log(topCrates)
    return topCrates
}

findTopCrates('9000');
findTopCrates('9001');