#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var git_1 = require("./git");
var parser_1 = require("./parser");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, version, date, actions, commit;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = parser_1.readLastVersion(), version = _a.key, date = _a.date, actions = _a.actions;
                return [4 /*yield*/, git_1.currentCommit()];
            case 1:
                commit = _b.sent();
                return [4 /*yield*/, confirmation(version, date, actions, commit)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
var confirmation = function (version, date, actions, commit) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, abstract, _i, actions_1, action, _a, _b, change, message, answer;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                tag = "release-" + version;
                abstract = [
                    "Release info:",
                    "- Version: " + version,
                    "- Date:    " + date,
                    "- Tag:     " + tag,
                    "\nCommit:",
                    "- ID:      " + commit.key,
                    "- Message: " + commit.message,
                    "\nChanges:"
                ];
                for (_i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                    action = actions_1[_i];
                    abstract.push(" + " + action.name + ":");
                    for (_a = 0, _b = action.changes; _a < _b.length; _a++) {
                        change = _b[_a];
                        abstract.push("  - " + change);
                    }
                }
                message = abstract.join("\n");
                return [4 /*yield*/, utils_1.question(message + "\n\nPush release? (y/n): ")];
            case 1:
                answer = _c.sent();
                if (!(answer.toLowerCase() === "y")) return [3 /*break*/, 3];
                return [4 /*yield*/, git_1.pushTag(tag, message)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
main();
