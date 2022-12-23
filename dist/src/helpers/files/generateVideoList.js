"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideosList = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateVideosList = ({ files, camera, date }) => {
    return new Promise((resolve, reject) => {
        try {
            const videosPath = `${process.env.CLIPS_SUELTOS_PATH}/${date}/${(camera === 1) ? 'camara1' : 'camara2'}`;
            fs_1.default.mkdirSync(videosPath, { recursive: true });
            const listFilePath = `${videosPath}/camara${camera}list.txt`;
            let list = "";
            files.forEach(file => {
                list += `file ${file}`;
                list += "\n";
            });
            const writeStream = fs_1.default.createWriteStream(listFilePath);
            writeStream.write(list);
            writeStream.end();
            resolve(listFilePath);
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.generateVideosList = generateVideosList;
