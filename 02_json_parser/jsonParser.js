// Step 1 
const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    let firstChar = fileContent.charAt(0); 
    let lastChar = fileContent.charAt(fileContent.length - 1); 
    if(firstChar === '{' && lastChar === '}') {
        console.log("Valid JSON file")
        process.exit(0);
    } else {
        console.log("Invalid JSON file")
        process.exit(0);
    }
} 
