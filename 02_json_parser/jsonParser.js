// Step 1 
const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    //let json = JSON.parse(fileContent)
    //console.log("json: ", json)
    parseJSON(fileContent);
}

function parseJSON(fileContent) {
    fileContent = fileContent.replaceAll(/\s/g,'');
    let firstChar = fileContent.charAt(0);
    let lastChar = fileContent.charAt(fileContent.length - 1);
    //console.log(firstChar, lastChar)
    let json = parseSimpleJSON(fileContent);
    if(json) {
        console.log("simple JSON", json)
        process.exit(0);
    } 
    if(firstChar === '{' && lastChar === '}') {
        let jsonContent = fileContent.slice(1, fileContent.length - 1)
        json = parseAllTypes(jsonContent); //parseStringKeyValue(jsonContent);
        console.log("Step2 JSON of string key/value", json)
        process.exit(0);
    }else {
        console.log("Invalid JSON")
        process.exit(0);
    }
}
//step 1 
function parseSimpleJSON(fileContent) {
   if(fileContent === '{}'){
    let json = fileContent;
    return json; 
   } 
    return false;
}
// step 2
function parseStringKeyValue(content) {
    let items = content.split(':')
    if(checkForString(items[0]) && checkForString(items[1])) {    
        let json = items[0].split('"')[1] + ": '"
+ items[1].split('"')[1];
        return json;
    } 
        return false;
}

// step 3
function parseAllTypes(content) {
    let items = content.split(',');
    let json = [];
    for(let item of items) {
        if(parseStringKeyValue(item)) {
            json.push(parseStringKeyValue(item));
        } else if(checkForBool(item)) {
            json.push(checkForBool(item));
        } else if(checkForNumber(item)) {
            json.push(checkForNumber(item));
        } else if(checkForNull(item)) {
            json.push(checkForNull(item));
        } else {
            return `Invalid JSON around ${item}`;
        }
    }
    if(json) { return json } 
    return false;
}
 // step 3 check functions
function checkForString(item) {
    let firstChar = item.charAt(0);
    let lastChar = item.charAt(item.length - 1);
    if(firstChar === '"' && lastChar === '"') {
        return true;
    }
    return false;
}

function checkForBool(content) {
   let items = content.split(':')
   if(checkForString(items[0]) && (items[1] == "true" || items[1] == "false")) {
        let json = items[0].split('"')[1] + ": " + items[1];
        return json;
    }
    return false;
}

function checkForNumber(content) {
    let items = content.split(':');
    if(checkForString(items[0]) && Number(items[1])) {
        return content;
    }
    return false;
}

function checkForNull(content) {
    let items = content.split(':');
    if(checkForString(items[0]) && items[1] === "null") {
        return content;
    }
    return false;
}
