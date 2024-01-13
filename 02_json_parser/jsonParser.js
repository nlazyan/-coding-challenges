// Step 1 
const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    //let json = JSON.parse(fileContent)
    //console.log("json: ", json)
    console.log("JSON parse: ", parseJSON(fileContent));
}

function parseJSON(fileContent) {
    console.log("parse json ", fileContent)
    fileContent = fileContent.replaceAll(/\s/g,'');
    let firstChar = fileContent.charAt(0);
    let lastChar = fileContent.charAt(fileContent.length - 1);
    let json = parseSimpleJSON(fileContent);
    if(json) {
        process.exit(0);
    } 
    if(firstChar === '{' && lastChar === '}') {
        let jsonContent = fileContent.slice(1, fileContent.length - 1)
        json = parseAllTypes(jsonContent); //parseStringKeyValue(jsonContent);
        console.log("Step2 JSON of string key/value", json)
        return json;
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
            console.log("STRING")
            json.push(parseStringKeyValue(item));
        } else if(checkForBool(item)) {
            console.log("BOOL")
            json.push(checkForBool(item));
        } else if(checkForNumber(item)) {
            console.log("NUMBER")
            json.push(checkForNumber(item));
        } else if(checkForNull(item)) {
            console.log("NULL")
            json.push(checkForNull(item));
        } else if(checkForArray(item)) {
            console.log("ARRAY")
            json.push(checkForArray(item));
        } else if(checkForObject(item)) {
            console.log("OBJECT")
            json.push( checkForObject(item));
        }else {
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

// Step 4
function checkForArray(content) {
    let items = content.split(':');
    if(checkForString(items[0]) && Array.isArray(items[1])) {
        //console.log("ARRAY: ", items[1])
        return content; 
    }   
    return false;
}

function checkForObject(content) {
    let contentArr = content.split(':'); 
    let items = [];
    items[0] = contentArr.shift();
    items[1] = contentArr.join(":")
    if(parseJSON(items[1])) {
        console.log("OBJECT ",content)
        return content
    }   
    return false;
} 
