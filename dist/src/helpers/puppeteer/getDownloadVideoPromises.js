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
// import { getVideos, seleccionarCamara2 } from '../helpersPagina';
// import { downloadVideo } from './downloadVideo';
const moment_1 = __importDefault(require("moment"));
const pageActions_1 = require("./pageActions");
const downloadVideo_1 = require("../files/downloadVideo");
moment_1.default.suppressDeprecationWarnings = true;
const getDownloadVideoPromises = ({ link, camera, multibar, videosToDownload, date, acceptCookies }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({
                headless: false,
                executablePath: process.env.CLIPS_SUELTOS_PATH,
                ignoreDefaultArgs: ["--mute-audio"]
            });
            const page = yield browser.newPage();
            yield page.goto(link);
            console.log('Se abrió el navegador');
            if (acceptCookies) {
                //Accept cookies
                yield page.click('button.btn:nth-child(3)', {
                    button: 'left',
                    clickCount: 1,
                    delay: 1000
                });
                console.log('Se aceptaron las cookies');
            }
            if (camera === 2) {
                yield delay(5);
                yield (0, pageActions_1.selectCamera2)(page);
                console.log('Se seleccionó la segunda camara');
            }
            // await delay(15)
            const links = yield (0, pageActions_1.getLinksVideosFromPage)(page);
            yield browser.close();
            console.log(`Se cerró el navegador`);
            const videosPromises = [];
            links.forEach((src, i) => __awaiter(void 0, void 0, void 0, function* () {
                if (videosToDownload.includes(`${i + 1}`))
                    videosPromises.push((0, downloadVideo_1.downloadVideo)({ src, counter: i, date, camera, multibar }));
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
const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
