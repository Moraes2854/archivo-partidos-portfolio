"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompleteVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateCompleteVideo = ({ camara, listVideosPath, fecha }) => {
    fs_1.default.mkdirSync(`${process.env.PARTIDOS_ENTEROS_PATH}/${fecha}`, { recursive: true });
    const outputFilePath = `${process.env.PARTIDOS_ENTEROS_PATH}/${fecha}/camara${camara}.mp4`;
    (0, child_process_1.exec)(`ffmpeg -safe 0 -f concat -i ${listVideosPath} -c copy ${outputFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        else {
            return;
        }
    });
    return `${outputFilePath}`;
};
exports.generateCompleteVideo = generateCompleteVideo;
