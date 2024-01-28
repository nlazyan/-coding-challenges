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
            this.i += 1;
            this.skip_whitespace();
            while(this.s[this.i] !== '"') {
                if(this.i > this.s.length) {
                    return this.JsonException("Invalid JSON: Excpect string");
                }
                result += this.s[this.i];
                this.i += 1
            }
            this.i += 1;
            return result;
        }
    }
    parse_array() {
        return;
    }
    parse_number() {
        return false;
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
        if(!result) {
            result = this.parse_array();
        }
        if(!result) {
            result = this.parse_bool();
        }
        if(!result) {
            result = this.parse_null();
        }
        return result;

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
jp.s = '{"n": null, "key":"value"}';
if(fileName) {
    fileContent = fs.readFileSync(fileName).toString();
    jp.s = fileContent;
}
console.log("starting with class", jp.parse_value())
