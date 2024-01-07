#! /usr/local/bin/node

function countBytes(txt) {
    const byteSize = str => new Blob([str]).size;
    return byteSize(txt);
}
function countLines(txt) {
    txt = txt.toString();
    var lines = txt.split('\n');
    return (lines.length - 1);
}
function countWords(txt) {
    txt = txt.toString();
    return txt.trim().split(/\s+/).length;
}
function countCharacters(txt) {
    txt = txt.toString();
    return txt.length;
}

const fs = require('fs');

// command: process.argv[1] 
// option: process.argv[2] 
// file = option ? argv[3]: argv[2]

let stdInput = "";
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', inputStdin => {
    stdInput +=  inputStdin;
});

var file = "";
var fileContent = "";
const option = process.argv[2];
var options =  ['-c', '-l', '-m', '-w'];

try {
    if(option && option.split('')[0] == '-' && !options.includes(option)) {
        console.log(`ccwc: illegal option -- ${option.split('-')[1]} \nusage: wc [-clmw] [file ...]`)
        process.exit(0);
    }
    if(options.includes(option)){
        file = process.argv[3];
    } else { 
        file = process.argv[2];
    }
    if (option === '-c') {
        if(file) {
            fileContent = fs.readFileSync(file)
            console.log(countBytes(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(countBytes(stdInput));
            });
        }
    } else if(option === '-l') {
        if(file) {
            fileContent = fs.readFileSync(file);
            console.log(countLines(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(countLines(stdInput));
            });
        }
    } else if(option === '-w') {
        if(file) {
            fileContent = fs.readFileSync(file)
            console.log(countWords(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(countWords(stdInput));
            });
        }
    } else if(option === '-m') {
        if(file) {
            fileContent = fs.readFileSync(file)
            console.log(countCharacters(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(countCharacters(stdInput));
            });
        }
    } else {
        if(file) {
	        fileContent = fs.readFileSync(file)
            console.log(countLines(fileContent), countWords(fileContent), countBytes(fileContent), file)
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(countLines(stdInput), countWords(stdInput), countBytes(stdInput));
            }); 
        }
    }
} catch(error) {
    console.error(error.message);
    process.exit(0);
}

