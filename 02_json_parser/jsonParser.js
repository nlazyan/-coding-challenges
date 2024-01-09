// Step 1 
const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    parseSimpleJSON(fileContent);
}

function parseSimpleJSON(fileContent) {
    fileContent = fileContent.replaceAll(/\s/g,'');
    let firstChar = fileContent.charAt(0);
    let lastChar = fileContent.charAt(fileContent.length - 1);
    console.log(firstChar, lastChar)
    if(firstChar === '{' && lastChar === '}') {
        console.log("Valid JSON")
        let jsonContent = fileContent.slice(1, fileContent.length - 1)
        parseStringKeyValue(jsonContent);
        process.exit(0);
    }else {
        console.log("Invalid JSON")
        process.exit(0);
    }
}

function parseStringKeyValue(jsonContent) {
    let items = jsonContent.split(':')
    for(item of items) {
        let firstChar = item.charAt(0);
        let lastChar = item.charAt(item.length - 1);
        if(firstChar === '"' && lastChar === '"') {
            continue;
        } else {
            console.log("Invalid JSON around: ", item);
            return;
        }
    }
    console.log("Valid JSON object containing string key and value")
} 
