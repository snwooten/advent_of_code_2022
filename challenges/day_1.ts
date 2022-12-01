import { textToArray, stringToInt } from "../utils/index.js";
import { getInput } from "../inputs/get_input.js";

// const testData = [1000,
// 2000,
// 3000,
// '',
// 4000,
// ',
// 5000,
// 6000,
// '',
// 7000,
// 8000,
// 9000,
// '',
// 10000];

// console.log(testData);

getInput('1');

const input = textToArray('./day_1_input.txt');

function findHighestNthCalories(calories: number[], n: number): number[] {
    if (calories.length > n) {
        const sortedMaxList = [...calories].sort((a, b) => a-b);
        sortedMaxList.shift();
        return sortedMaxList;
    }
    return calories;
}

function findMostCalories(calories: string[], n: number): number[] {
    let currVal: string|number = 0;
    let total = 0;
    let maxList = [];

   for (let i = 0; i < calories.length; i++) {
        currVal = calories[i]
        if (currVal === '') {
            maxList.push(total);
            total = 0;
            maxList = findHighestNthCalories(maxList, n);
        } else {
            const currValNum = stringToInt(currVal);
            total += currValNum;
        }
    }

    console.log(maxList);
    return maxList;
}

findMostCalories(input, 1);

function getCalorieSum(calories: number[]): number {
    const total = calories.reduce((accum, currVal) => {
        return accum += currVal;
    }, 0)
    console.log(total);
    return total;
}

getCalorieSum(findMostCalories(input, 3));