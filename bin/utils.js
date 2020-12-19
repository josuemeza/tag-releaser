"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exports.question = void 0;
var util_1 = __importDefault(require("util"));
var readline_1 = require("readline");
var question = function (message) {
    return new Promise(function (resolve) {
        var readlineInterface = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readlineInterface.question(message, function (answer) {
            resolve(answer);
            readlineInterface.close();
        });
    });
};
exports.question = question;
exports.exec = util_1.default.promisify(require("child_process").exec);
