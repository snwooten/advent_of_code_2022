
import fetch from "node-fetch";
import { writeFileSync, existsSync } from "fs"

function buildInputUrl(day: string): string {
    const url = `https://adventofcode.com/2022/day/${day}/input`;
    return url;
} 

function buildFileName(day: string): string {
    return `./inputs/day_${day}_input.txt`
}

 function checkIfInputExists(day): boolean { 
    const fileName = buildFileName(day);
    const inputExists = existsSync(fileName)
    
    return inputExists;
}

export function getInput(day: string): void {
    const inputExists = checkIfInputExists(day);
    const COOKIE = null;
    if (!COOKIE) {
        throw new Error('Get your cookie');
    }
    if (!inputExists) {
        const url = buildInputUrl(day);
        fetch(url, {
        headers: {
            "cookie": COOKIE,
            "User-Agent": "https://github.com/snwooten/advent_of_code_2022 by snwooten@gmail.com",
        },
        })
        .then((res) => {
            console.log("Getting advent calendar data...");
            if (res.status !== 200) {
                throw new Error(String(res.status))
            }
            return res.text();
        })
        .then((body) => {
            const fileName = buildFileName(day);
            writeFileSync(fileName, body.replace(/\n$/, ""))
            console.log('SAVED!');
        })
        .catch((exception) => {
            console.log("Exception : ", exception);
        });
    }

}

getInput('4');