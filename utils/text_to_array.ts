import { readFileSync } from 'fs';

 export function textToArray(filename: string): string[] {
   const path = `/Users/swoot/Desktop/advent_of_code_2022/inputs/${filename}`
    const contents = readFileSync(path, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
    
    return arr;
  };
