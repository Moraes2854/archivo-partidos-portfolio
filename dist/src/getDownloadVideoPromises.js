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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloadVideoPromises = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const helpersPagina_1 = require("./helpers/helpersPagina");
const downloadVideo_1 = require("./helpers/download/downloadVideo");
const moment_1 = __importDefault(require("moment"));
moment_1.default.suppressDeprecationWarnings = true;
const getDownloadVideoPromises = ({ link, camara, multibar, videosParaDescargar, fechaIngresadaPorConsola }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({
                headless: false,
                executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
                ignoreDefaultArgs: ["--mute-audio"]
            });
            const page = yield browser.newPage();
            yield page.goto(link);
            if (camara === 2)
                yield (0, helpersPagina_1.seleccionarCamara2)(page);
            const resp = yield (0, helpersPagina_1.getVideos)(page);
            yield browser.close();
            const videosPromises = [];
            resp.forEach((src, i) => __awaiter(void 0, void 0, void 0, function* () {
                if (videosParaDescargar.includes(`${i + 1}`))
                    videosPromises.push((0, downloadVideo_1.downloadVideo)({ src, contador: i, fecha: fechaIngresadaPorConsola, camara, multibar }));
            }));
            resolve(videosPromises);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    }));
});
exports.getDownloadVideoPromises = getDownloadVideoPromises;
