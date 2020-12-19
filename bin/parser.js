"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLastVersion = void 0;
var fs = __importStar(require("fs"));
var readLastVersion = function () {
    var regex = {
        version: /^## (?:\[)(\d*.\d*.\d*)(?:\]) - (\d{4}-\d{2}-\d{2})/i,
        action: /^### (Added|Changed|Deprecated|Removed|Fixed|Security)/i,
        change: /^- (.*)/i
    };
    var lines = fs
        .readFileSync("CHANGELOG.md", "utf8")
        .split("\n")
        .filter(Boolean);
    var lastVersion = null;
    var currentAction = null;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (lastVersion) {
            if (regex.version.test(line))
                break;
            if (currentAction) {
                if (regex.change.test(line)) {
                    var match_1 = line.match(regex.change);
                    if (match_1) {
                        var _ = match_1[0], change = match_1[1];
                        currentAction.changes.push(change);
                    }
                }
            }
            else if (regex.action.test(line)) {
                if (currentAction) {
                    lastVersion.actions.push(currentAction);
                }
                var match_2 = line.match(regex.action);
                if (match_2) {
                    var _ = match_2[0], name = match_2[1];
                    currentAction = { name: name, changes: [] };
                }
            }
        }
        else if (regex.version.test(line)) {
            var match_3 = line.match(regex.version);
            if (match_3) {
                var _ = match_3[0], version = match_3[1], date = match_3[2];
                lastVersion = { key: version, date: date, actions: [] };
            }
        }
    }
    if (lastVersion && currentAction) {
        lastVersion.actions.push(currentAction);
    }
    if (!lastVersion)
        throw new Error("Error matching version of changelog file");
    return lastVersion;
};
exports.readLastVersion = readLastVersion;
