import { stringToArray, textToArray } from "../utils/index.js";
const input = textToArray('day_2_input.txt');

// 1. 
// Rock beats Scissors (A beats Z) (X beats C)
// Paper beats Rock (B beats X) (Y beats A)
// Scissors beats Paper (C beats Y) (Z beats B)
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors. 
// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

// Test input:
// const input: [RPCChoice, 'X'| 'Y' | 'Z'][] = [['A', 'Y'], ['B', 'X'], ['C', 'Z']]

// 2. 
// X means you need to lose, 0
// Y means you need to end the round in a draw, 3
// Z means you need to win 6

type RPCChoice = 'A'| 'B' | 'C';

const optionPoints = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
}

const myPoints = {
    X: {C: 6, A: 3, B: 0},
    Y: {A: 6, B: 3, C: 0},
    Z: {B: 6, C: 3, A: 0},
}

const winLoseDrawPoints = {
    X: 0,
    Y: 3,
    Z: 6,
}

const winLoseDrawOptions = {
    X: {A: 'C', B: 'A', C: 'B'},
    Y: {A: 'A', B: 'B', C: 'C'},
    Z: {A: 'B', B: 'C', C: 'A'},
}


function getPlayerPointsForRound(round:string[], player: number): number {
    let playerChoice = round[player];
    let oppChoice = player === 1 ? round[0] : round[1];
    let playerPoints = 
    optionPoints[playerChoice] + myPoints[playerChoice][oppChoice];
    
    return playerPoints;
}

function getMyPoints(winLoseDraw: 'X'| 'Y' | 'Z', myChoice: RPCChoice): number {
    const pointTotal = optionPoints[myChoice] + winLoseDrawPoints[winLoseDraw];

    return pointTotal;
}


function findMyRPSScore(): { myTotalRound1: number, myTotalRound2: number } {
    let myTotalRound1 = 0;
    let myTotalRound2 = 0;

    for (let i = 0; i < input.length; i++) {
       // const round = input[i]; // for testing
       const round = stringToArray(input[i], ' ');

       myTotalRound1 += getPlayerPointsForRound(round, 1);

       const myChoice = winLoseDrawOptions[round[1]][round[0]];
       myTotalRound2 += getMyPoints(round[1], myChoice);
    }

    console.log({ myTotalRound1, myTotalRound2 });
    return {myTotalRound1, myTotalRound2};
}


findMyRPSScore();