"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompleteVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const dotenv_1 = __importDefault(require("dotenv"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
dotenv_1.default.config();
const generateCompleteVideo = ({ camera, date, listVideosPath }) => {
    return new Promise((resolve, reject) => {
        fs_1.default.mkdirSync(`${process.env.PARTIDOS_ENTEROS_PATH}/${date}`, { recursive: true });
        const outputFilePath = `${process.env.PARTIDOS_ENTEROS_PATH}/${date}/camara${camera}.mp4`;
        (0, child_process_1.exec)(`${ffmpeg_static_1.default} -safe 0 -f concat -i ${listVideosPath} -c copy ${outputFilePath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
            }
            else {
                const video = {
                    camera,
                    date,
                    downloaded: true,
                    name: `camara${camera}.mp4`,
                    numberVideo: '1',
                    path: outputFilePath
                };
                resolve(video);
            }
        });
    });
};
exports.generateCompleteVideo = generateCompleteVideo;
