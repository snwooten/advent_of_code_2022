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

const points = {
    A: 1,
    B: 2,
    C: 3,
}
function getMyChoice(oppChoice: RPCChoice, winLoseDraw: 'X'| 'Y' | 'Z'): RPCChoice {
    let myChoice = '' as RPCChoice;
    if (winLoseDraw === 'X') {
        if (oppChoice === 'A') myChoice = 'C';
        if (oppChoice === 'B') myChoice = 'A';
        if (oppChoice === 'C') myChoice = 'B';
   }
    if (winLoseDraw === 'Y') {
        if (oppChoice === 'A') myChoice = 'A';
        if (oppChoice === 'B') myChoice = 'B';
        if (oppChoice === 'C') myChoice = 'C';
    }
    if (winLoseDraw === 'Z') {
        if (oppChoice === 'A') myChoice = 'B';
        if (oppChoice === 'B') myChoice = 'C';
        if (oppChoice === 'C') myChoice = 'A';
    }
    
    return myChoice;
}

function getPlayerPointsForRound(round:string[], player: number): number {
    let playerChoice = round[player];
    let oppChoice = player === 1 ? round[0] : round[1];
    let playerPoints = 0;
    
    switch(playerChoice) {
        case 'A':
            playerPoints += 1
            playerPoints += oppChoice === 'Z' ? 6 : 0;
            playerPoints += oppChoice === 'X' ? 3 : 0;
            break;

         case 'B':
            playerPoints += 2
            playerPoints += oppChoice === 'X' ? 6 : 0;
            playerPoints += oppChoice === 'Y' ? 3 : 0;
            break;

        case 'C':
            playerPoints += 3
            playerPoints += oppChoice === 'Y' ? 6 : 0;
            playerPoints += oppChoice === 'Z' ? 3 : 0;
            break;

        case 'X':
            playerPoints += 1
            playerPoints += oppChoice === 'C' ? 6 : 0;
            playerPoints += oppChoice === 'A' ? 3 : 0;
            break;
        
        case 'Y':
            playerPoints += 2
            playerPoints += oppChoice === 'A' ? 6 : 0;
            playerPoints += oppChoice === 'B' ? 3 : 0;
            break;

        case 'Z':
            playerPoints += 3
            playerPoints += oppChoice === 'B' ? 6 : 0;
            playerPoints += oppChoice === 'C' ? 3 : 0;
            break;
    }
    
    return playerPoints;
}

function getMyPoints(winLoseDraw: 'X'| 'Y' | 'Z', myChoice: RPCChoice): number {
    let pointTotal = 0;
    if (winLoseDraw === 'X') {
        pointTotal += points[myChoice];
    }
    if (winLoseDraw === 'Y') {
        pointTotal += 3 + points[myChoice];
    }
    if (winLoseDraw === 'Z') {
        pointTotal += 6 + points[myChoice];
    }

    return pointTotal;
}


function findMyRPSScore(): { myTotalRound1: number, myTotalRound2: number } {
    let myTotalRound1 = 0;
    let myTotalRound2 = 0;

    for (let i = 0; i < input.length; i++) {
       // const round = input[i]; // for testing
       const round = stringToArray(input[i], ' ');
       myTotalRound1 += getPlayerPointsForRound(round, 1);
       const myChoice = getMyChoice(round[0], round[1]);
       myTotalRound2 += getMyPoints(round[1], myChoice);
    }
    console.log('myTotalRound1: ', myTotalRound1);
    console.log('myTotalRound2: ', myTotalRound2);
    return {myTotalRound1, myTotalRound2};
}


findMyRPSScore();