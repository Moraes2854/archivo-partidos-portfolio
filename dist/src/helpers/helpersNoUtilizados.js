"use strict";
// export const adelantarVideoCincoMinutos = async(page:Page)=>{
//     let horaActual = await getHoraPartido(page);
//     const horaFutura = moment(horaActual).add('minutes', 5).toDate();
//     const call = async()=>{
//         horaActual = await getHoraPartido(page);
//         if (horaActual>=horaFutura) return;
//         await page.click('#div_ir_para_adelante > a:nth-child(1) > i:nth-child(1)');
//         setTimeout(call, 200);
//     }
//     setTimeout(call, 200);
// }
// export const getHoraPartido = async(page:Page)=>{
//     const hora = await page.evaluate(()=>{
//         return document.getElementById('div_hora')?.textContent;
//     });
//     const horaFinal = new Date();
//     horaFinal.setHours(parseInt((hora as string).substring(0, 2)));
//     horaFinal.setMinutes(parseInt((hora as string).substring(3, 5)));
//     horaFinal.setSeconds(parseInt((hora as string).substring(6, 8)));
//     return horaFinal;
// }
// export const checkFileExist = async(path:string, timeout = 2000):Promise<boolean>=>{
//     let totalTime = 0; 
//     let checkTime = timeout / 10;
//     return await new Promise((resolve, reject) => {
//         const timer = setInterval(function() {
//             totalTime += checkTime;
//             const fileExists = fs.existsSync(path);
//             if (fileExists || totalTime >= timeout) {
//                 clearInterval(timer);
//                 resolve(fileExists);
//             }
//         }, checkTime);
//     });
// }
// const getFileListIfExist = (fecha:string)=>{
//     const files = fs.readdirSync(`${process.env.CLIPS_SUELTOS_PATH}/${fecha}/camara1`, {withFileTypes: true});
//     files.forEach( file => {
//         if (path.extname(file.name) === ".mp4") console.log(file.name)
//     } );
// }
