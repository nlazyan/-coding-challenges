class JsonParser {
    constructor() {
        this.i = 0;
        this.s = "";
        this.depth = 0;
    }
    skip_whitespace() {
        while(this.i < this.s.length 
            && [" ", "\n", "\t", "\r"].includes(this.s[this.i])) {
                this.i += 1;
        }
    }
    process_colon() {
        if(this.s[this.i] !== ":") {
            return this.JsonException("Invalid JSON: Expect ':'");
        }
        this.i += 1;
    }
    process_comma() {
        if(this.s[this.i] !== ",") {
            return this.JsonException("Invalid JSON: Expecte ','");
        }
        this.i += 1;
    }
    parse_object() {
        if(this.s[this.i] === "{") {
            this.i += 1;
            this.depth +=1;
            this.skip_whitespace();
            let result = {};
            let initial = true;

            let i = this.i;
            while(this.s[i] !== "}") {
                this.i = i;
                if(!initial) {
                    this.skip_whitespace();
                    this.process_comma();
                    this.skip_whitespace();
                }
                let key = this.parse_string();
                this.skip_whitespace();
                this.process_colon();
                this.skip_whitespace();
                let value = this.parse_value();
                result[key] = value;
                this.skip_whitespace();
                initial = false;
                i += 1;
            }
            this.i = i;
            this.depth -=1;
            return result;
        }
    }

    parse_string() {
        if(this.s[this.i] === '"') {
            let result = "";
            let i = 2;
            this.skip_whitespace();
            
            while(this.s[i] !== '"') {
                if(this.i > this.s.length) {
                    return this.JsonException("Invalid JSON: Excpect string");
                }
                result += this.s[i];
                i++
            }
            this.i = i + 1;
            return result;
        }
    }
    parse_value() {
        let result = this.parse_string();
        return result;
    }

    JsonException(errorMessage) {
        return `Error: ${errorMessage}`;
    }

}

const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

let jp = new JsonParser();
jp.s = '{"n": "ona"}';
if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    jp.s = fileContent;
}
console.log("starting with class", jp.parse_object())
