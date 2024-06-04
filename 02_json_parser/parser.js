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
            return false; //this.JsonException("Invalid JSON: Expecte ','");
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

            while(this.s[this.i] !== "}") {
                if(!initial) {
                    this.skip_whitespace();
                    this.process_comma();
                    this.skip_whitespace();
                }
                let key = this.parse_string();
                if(!key ) {
                    return;
                }
                this.skip_whitespace();
                this.process_colon();
                this.skip_whitespace();
                let value = this.parse_value();
                if(!value[1]) {
                    return value[0];
                }
                result[key] = value[0];
                this.skip_whitespace();
                initial = false;
            }
            this.i += 1;
            this.depth -=1;
            return result;
        } else return false; 
        //this.JsonException(`Unexpected end of JSON input at
        //position ${this.i}, ${this.s[this.i]}`);
    }

    parse_string() {
        if(this.s[this.i] === '"') {
            let result = "";
            this.i += 1;
            this.skip_whitespace();
            while(this.s[this.i] !== '"') {
                if(this.i > this.s.length) {
                    return this.JsonException("this Invalid JSON: Excpect string");
                }
                result += this.s[this.i];
                this.i += 1
            }
            this.i += 1;
            this.skip_whitespace();
            return result;
        }
    }
    parse_array() {
        if(this.s[this.i] === "[") {
            let result = [];
            this.i += 1;
            while(this.s[this.i] !== "]") {
                let value = this.parse_value();
                if(value[1]) {
                    result.push(value[0]);
                    this.i += 1;
                    this.skip_whitespace();
                } else {return result}
                let comma = this.process_comma();
                if(comma) {
                    value = this.parse_value();
                    if(!value) {
                        return false;
                    } else { this.skip_whitespace(); reult.push(value)}
                }
            }
            this.i += 1;
            return result;
        }
        return;
    }
    parse_number() {
        let start = this.i;
        while(!isNaN(this.s[this.i]) && !isNaN(parseFloat(this.s[this.i]))) {
            this.i += 1;
        }
        if(this.i > start) {
            return this.s.substring(start, this.i)
        }
        return;
    }
    parse_bool() {
        let bool;
        if(this.s[this.i] === 't') {
            bool = 'true'
        }else {
            if(this.s[this.i] === 'f') {
                bool = 'false';
            }
        }
        if(!bool) return;
        if(this.s.substr(this.i, bool.length) === bool) {
            this.i += bool.length;
            return bool;
        }
        return;
    }
    parse_null() {
        let nullValue = 'null';
        if(this.s.substr(this.i, nullValue.length) === nullValue) {
            this.i += nullValue.length;
            return nullValue;
        }
        return;
    }

    parse_value() {
        let result = this.parse_string();
        if(!result) {
            result = this.parse_number();            
        }
        if(!result) {
            result = this.parse_object();
        }
        if(result === 'undefined' || result === false) {
            result = this.parse_array();
        }
        if(!result) {
            result = this.parse_bool();
        }
        if(!result) {
            result = this.parse_null();
        }
        if(!result) {
            result = this.JsonException(`Invalid value at position ${this.i} \n
            ${this.s} \n ${this.s[this.i]}`);
            return [result, false]
        }
        return [result, true];
    }

    JsonException(errorMessage) {
        return `Error: ${errorMessage}`;
    }

    parseJSON() {
    let str = this.parse_object();
        if(str) {
            return str;
        } else {
            return this.JsonException(`SyntaxError: Expected double-quoted
                property name in JSON at position ${this.i}`);
        }
    }

}

const fs = require('fs');
var fileName = process.argv[2];
var fileContent = "";

let jp = new JsonParser();
jp.s = '{"n": null, "key":"value"}';
if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    jp.s = fileContent;
}
console.log("JSON: ", jp.parseJSON())
