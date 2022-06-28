/*
// NAME: Viral Hello World
// CONTRIBUTORS: Steph Koopmanschap
// VERSION: 1.0
*/

//viralHelloWorld.js

/*
    This program:
    1. reads its own source code (this file)
    2. Then copies its own source code to a new file with a unique Id appended (to prevent filename errors).
    3. Then it executes its own copy.
    4. Repeat step 1. in an infinite loop
*/

// IMPORTS

const os = require('os');
const readline = require('readline');
const fs = require('fs');

// DECLARATIONS

var inputInterface = null;
var readFileStream = null;
var fileWriteStream = null;

var fileContent = null;
var fileId = 0;
var outputFileName = "";
var debugMode = false;

// FUNCTIONS

function debugLog(line) {
    if(debugMode === true) {
        console.log(line);
    }
}

//returns a random integer between min and max
function randIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//called whenever a line is read from viralHelloWorld.js
//(line) is the read line from viralHelloWorld.js.
function writeLine(line) {
    debugLog(line);
    //write to outputFileName.js
    fileWriteStream.write(line + os.EOL); 
}

// PROGRAM START

//start the read stream interface
readFileStream = fs.createReadStream('viralHelloWorld.js');
//start the input interface
inputInterface = readline.createInterface({
    input: readFileStream
});
//Create a large random number to append to the filename (to prevent duplicate filename errors.)
fileId = randIntRange(1, 99999999999999);
//Append the id to the filename
outputFileName = "viralHelloWorld" + fileId + ".js";
//start the write stream
fileWriteStream = fs.createWriteStream(outputFileName, 'utf8');

// EVENT HANDLERS

//Call writeLine whenever a line is read. (line event is emmitted)
inputInterface.on('line', writeLine);
//Call this function when file reading is finished.
readFileStream.on('end', () => {
    //Close the file writing stream;
    fileWriteStream.end();
    //Read the new copied file
    fs.readFile("./" + outputFileName, "utf-8", (err, data) => {
        if (err) {
            console.log(`File can't be read: ${err}`);
        } else {
            console.log("Hello World from" + outputFileName);
            fileContent = data;
            //execute the copied file
            eval(fileContent);
        }
    });
});
