function crosswordSolver(puzzle, wordList) {
    // Split the puzzle into rows
    const rows = puzzle.trim().split('\n');

    // Check the number of words in each row
    for (let row of rows) {
        const rowChars = row.split('');
        let wordCount = 0;
        let emptyCount = 0; // Count of empty spaces
        for (let char of rowChars) {
            if (char !== '.' && char !== '\n') {
                if (isNaN(parseInt(char))) {
                    console.log('Error: Invalid character');
                    return;
                }
                wordCount += parseInt(char);
            } else if (char === '.') {
                emptyCount++; // Increment empty space count
            }
        }
        // Compare wordCount with the sum of actual words and empty spaces
        if (wordCount > row.length - emptyCount) {
            console.log('Error: Invalid word count');
            return;
        }
    }

    // Check the number of words in each column
    const cols = [];
    for (let i = 0; i < rows[0].length; i++) {
        cols.push(rows.map(row => row[i]));
    }
    for (let col of cols) {
        let wordCount = 0;
        let emptyCount = 0; // Count of empty spaces
        for (let char of col) {
            if (char !== '.' && char !== '\n') {
                if (isNaN(parseInt(char))) {
                    console.log('Error: Invalid character');
                    return;
                }
                wordCount += parseInt(char);
            } else if (char === '.') {
                emptyCount++; // Increment empty space count
            }
        }
        // Compare wordCount with the sum of actual words and empty spaces
        if (wordCount > col.length - emptyCount) {
            console.log('Error: Invalid word count');
            return;
        }
    }

    // Check the words in the wordList
    const usedWords = new Set();
    for (let word of wordList) {
        if (usedWords.has(word)) {
            console.log('Error: Duplicate word');
            return;
        }
        usedWords.add(word);
    }


 // Fill the puzzle with the words from the wordList
let index = 0;
const filledPuzzle = rows.map(row => {
    let filledRow = '';
    let currentWordIndex = 0;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '.') {
            filledRow += '.';
        } else if (char === '\n') {
            filledRow += '\n';
            currentWordIndex = 0; // Reset currentWordIndex at new line
        } else {
            if (currentWordIndex < parseInt(char)) {
                const word = wordList[index++];
                filledRow += word;
                currentWordIndex++;
            } else {
                filledRow += '.';
            }
        }
    }
    return filledRow;
}).join('\n');

    console.log(filledPuzzle);
}

// Example usage:
const emptyPuzzle = `2001
0..0
1000
0..0`;
const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);