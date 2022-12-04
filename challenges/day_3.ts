import { textToArray } from "../utils/index.js";

const testInput = ['vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw']
    // const input = testInput;
    const input = textToArray('day_3_input.txt');



    // The list of items for each rucksack is given as characters all on a single line. 
    // A given rucksack always has the same number of items in each of its two compartments
    // the first half of the characters represent items in the first compartment
    // the second half of the characters represent items in the second compartment.

    // Lowercase item types a through z have priorities 1 through 26.
    // Uppercase item types A through Z have priorities 27 through 52.

    // Find the item type that appears in both compartments of each rucksack. 
    // What is the sum of the priorities of those item types?

function splitStringInHalf(str: string): string[] {
    const half = Math.ceil(str.length / 2);  
    
    const firstHalf = str.slice(0, half)
    const secondHalf = str.slice(half)

    return [firstHalf, secondHalf];
}

function findCommonLetterIn3Strings(strings: string[]): string {
    const first = strings[0];
    const second = strings[1];
    const third = strings[2];
    let commonLetter = '';
    for(let i = 0; i < first.length; i++) {
        const firstLetter = first[i];
        const secondLetter = second[i];
        const thirdLetter = third[i];
        if (second.includes(firstLetter) && third.includes(firstLetter)) {
            commonLetter = firstLetter
            break;
        }
        if (first.includes(secondLetter) && third.includes(secondLetter)) {
            commonLetter = secondLetter
            break;
        }
        if (first.includes(thirdLetter) && second.includes(thirdLetter)) {
            commonLetter = thirdLetter
            break;
        }
    }
    console.log('commonLetter', commonLetter);
    return commonLetter;
}

function findCommonLetter(strings: string[]): string {
    const firstHalf = strings[0];
    const secondHalf = strings[1];
    let commonLetter = '';
    for(let i = 0; i < firstHalf.length; i++) {
        const firstHalfLetter = firstHalf[i];
        const secondHalfLetter = secondHalf[i];
        if (secondHalf.includes(firstHalfLetter)) {
            commonLetter = firstHalfLetter
            break;
        }
        if (firstHalf.includes(secondHalfLetter)) {
            commonLetter = secondHalfLetter
            break;
        }
    }
    return commonLetter;
}

function getPriority(letter: string) {
    const capitalizedLetter = letter.toUpperCase();
    const code = letter.charCodeAt(0);
    let priority = 0;
    if (letter === capitalizedLetter) {
        priority = code - 64 + 26;
    } else {
        priority = code - 96;
    }
    return priority;
}

function findSumOfPriorities(): number {
    let points = 0;
    for (let i = 0; i < input.length; i++) {
        const str = input[i];
        const strArr = splitStringInHalf(str);
        const commonLetter = findCommonLetter(strArr);
        points += getPriority(commonLetter);
    }
    console.log(points);
    return points;
}

findSumOfPriorities();

function findSumOfPriorities2(): number {
    let points = 0;
    for (let i = 0; i < input.length; i+=3) {
        const strings = [input[i], input[i+1], input[i+2]];
        const commonLetter = findCommonLetterIn3Strings(strings);
        points += getPriority(commonLetter);
    }
    console.log(points);
    return points;
}

findSumOfPriorities2();