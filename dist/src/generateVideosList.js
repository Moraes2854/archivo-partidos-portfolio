"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideosList = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateVideosList = ({ files, camara, fecha }) => {
    fs_1.default.mkdirSync(`${process.env.CLIPS_SUELTOS_PATH}/${fecha}/${(camara === 1) ? 'camara1' : 'camara2'}`, { recursive: true });
    const listFilePath = `${process.env.CLIPS_SUELTOS_PATH}/${fecha}/${(camara === 1) ? 'camara1' : 'camara2'}/${Date.now()}camara${camara}list.txt`;
    let list = "";
    files.forEach(file => {
        list += `file ${file}`;
        list += "\n";
    });
    const writeStream = fs_1.default.createWriteStream(listFilePath);
    writeStream.write(list);
    writeStream.end();
    return `/${fecha}/${(camara === 1) ? 'camara1' : 'camara2'}/${Date.now()}camara${camara}list.txt`;
};
exports.generateVideosList = generateVideosList;
