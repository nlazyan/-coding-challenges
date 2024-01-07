// Step 1 
const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    if(fileContent === '{}') {
        console.log("Valid JSON file")
        process.exit(0);
    } else {
        console.log("Invalid JSON file")
        process.exit(0);
    }
} 
