import { readFileSync } from 'fs';

 export function textToArray(filename: string): string[] {
    const contents = readFileSync(filename, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
    
    return arr;
  };
