import { stringToInt, textToArray, stringToArray } from "../utils/index.js";

const testInput = ["2-4,6-8",
"2-3,4-5",
"5-7,7-9",
"2-8,3-7",
"6-6,4-6",
"2-6,4-8"];

// const input = testInput;
const input = textToArray('day_4_input.txt');

function getNumericRange(str: string): number[] {
    const separateRangeStrings = stringToArray(str, ',');
    const firstRangeNums = stringToArray(separateRangeStrings[0], '-');
    const secondRangeNums = stringToArray(separateRangeStrings[1], '-');

    const ranges = [stringToInt(firstRangeNums[0]), stringToInt(firstRangeNums[1]), stringToInt(secondRangeNums[0]), stringToInt(secondRangeNums[1])];
    console.log(ranges);
    return ranges;
}

function checkIfRangesOverlap(ranges: number[]): boolean {
    let rangeOverlaps = false;
    if(ranges[0] >= ranges[2] && ranges[1] <= ranges[3]) {
        rangeOverlaps = true;
    }
    if(ranges[2] >= ranges[0] && ranges[3] <= ranges[1]) {
        rangeOverlaps = true;
    }
    return rangeOverlaps;
}

function checkIfRangesPartiallyOverlap(ranges: number[]): boolean {
    if (ranges[0] <= ranges[3] && ranges[1] >= ranges[2]) return true; 
    else return false;
}

function findOverlappingSets(): Record<string,number> {
    let overlappingSets = 0;
    let partiallyOverlappingSets = 0;
    for (let i = 0; i < input.length; i++) {
        const ranges = getNumericRange(input[i]);
       const isOverlappingRanges = checkIfRangesOverlap(ranges);
       const isPartiallyOverlappingRanges = checkIfRangesPartiallyOverlap(ranges);
        if (isOverlappingRanges) overlappingSets += 1;
        if (isPartiallyOverlappingRanges) partiallyOverlappingSets += 1;
    }
    console.log(overlappingSets, partiallyOverlappingSets);
    return { overlappingSets, partiallyOverlappingSets }
}

findOverlappingSets();