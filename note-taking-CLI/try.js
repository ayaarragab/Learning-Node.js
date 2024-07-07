#!/usr/bin/env node
import { exit } from "node:process";
import { addOne } from "./src/utils.js";
import * as readline from 'node:readline';
while (true) {
    console.log("Enter number to add");
    let num = Number(readline.createInterface(
        {input: process.stdin,
        output: process.stdout,}
    ));
    if (isNaN(num)) {
        console.log("Please Enter a valid number");
        let num = Number(readline.createInterface(
            {input: process.stdin,
            output: process.stdout,}
        ));
    } else {
        console.log(addOne(num));
        let num = Number(readline.createInterface(
            {input: process.stdin,
            output: process.stdout,}
        ));
    }
    process.on('SIGINT', () => exit);
}
