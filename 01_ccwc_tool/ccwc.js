#! /usr/local/bin/node

function w(txt) {
    txt = txt.toString();
    return txt.trim().split(/\s+/).length;
}
function m(txt) {
    txt = txt.toString();
    const letters = txt.length;
    return letters;
}
function c(txt) {
    const byteSize = str => new Blob([str]).size;
    return byteSize(txt);
}
function l(txt) {
    txt = txt.toString();
    var lines = txt.split('\n');
    var lines_count = lines.length - 1;
    return lines_count;
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
            console.log(c(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(c(stdInput));
            });
        }
    } else if(option === '-l') {
        if(file) {
            fileContent = fs.readFileSync(file);
            console.log(l(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(l(stdInput));
            });
        }
    } else if(option === '-w') {
        if(file) {
            fileContent = fs.readFileSync(file)
            console.log(w(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(w(stdInput));
            });
        }
    } else if(option === '-m') {
        if(file) {
            fileContent = fs.readFileSync(file)
            console.log(m(fileContent), file);
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(m(stdInput));
            });
        }
    } else {
        if(file) {
	        fileContent = fs.readFileSync(file)
            console.log(l(fileContent), w(fileContent), c(fileContent), file)
            process.exit(0);
        } else {
            process.stdin.on('end', _ => {
                console.log(l(stdInput), w(stdInput), c(stdInput));
            }); 
        }
    }
} catch(error) {
    console.error(error.message);
    process.exit(0);
}

