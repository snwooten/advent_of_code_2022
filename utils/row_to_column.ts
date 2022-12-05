const testInput = [
"[D]",    // [
"[N] [C]", 
"[Z] [M] [P]",
" 1   2   3 ",
]

function findLongestString(array: string[]): string {
    let longest = array.reduce(
        function (a, b) {
            return a.length > b.length ? a : b;
        }
    );
    return longest;
}

export function rowToColumn(array: string[]): string[][] {
  if (!array?.length) return [];
  let i = 0; // outer counter
  let j = 0; // inner counter
  let h = findLongestString(array).length; // height
  let w = array.length; // width
  let t = []; // res

  for( i = 0; i < h; i++ ) {
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {
      // Save transposed data.
        t[i][j] = array[j][i];
    }
  }

  return t;
}