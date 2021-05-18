//import { CronJob } from '../node_modules/node-cron';
const fs = require("fs");
const path = require("path");

var mv = require('mv');
const readline = require('readline');

//var colors = require('../node_modules/colors');
//import  https  from 'https';

import { Color } from "colors";
import axios, { AxiosStatic } from "axios";
import { Helper } from "./helper";
import { AppSettings } from "./settings";
import dayjs = require("dayjs");
import { Console } from "console";

var colors = require("colors");
var cron = require("node-cron");
const https = require("https");

export class ImportadorTomaEstado {
  //private cronJob: CronJob;
  colors: Color;

  constructor() {}

  public async Start() {
    // console.log(
    //   colors.blue("------------------Toma Estados Importer Start--------------------")
    // );
    //cada 2 minutos entre las 21 y 22 hs
    // */50 16   20-30 * *  At every 50th minute past hour 16 on every day-of-month from 20 through 30 
    // */2 16-17* * *       At every 2nd minute past every hour from 16 through 17.                    
    cron.schedule("*/50 16 20-30 * *", async () => {
      // if (!AppSettings.Instance) {
      //   console.log("Toma estados AppSettings.instance is not initialized");
      // }
      await this.DoWork2();
    });
  }

  public async StartTest() {
    console.log(
      colors.red("------------------Importer non sheduler Start--------------------")
    );

    await this.DoWork();
  }

  public async DoWork(): Promise<void> {
    const sourceFolder = path.join(
      AppSettings.Instance.setting.sourceFolder,  Helper.getPeriodo()
    );
    const destFolder= path.join(
      AppSettings.Instance.setting.destFolder,  Helper.getPeriodo()
    );



    try {
      Helper.Log(`start process reading  ${sourceFolder}` )
      // dentro de la lectura del directorio
       fs.readdir(  sourceFolder,async (err:any, files:string[]) => {
          if (!err) {
            //se utiliza for await en lugar de files.forEach para que c/tarea dentro del ciclo sea llevada a cavo de manera sincrona
            //De lo contrario el ciclo si respeta las tareas pero solo dentro del ciclo y no contempla los demas ciclos
            // es desir todos los ciclos de actualizacion serian enviados en paralelo y eso podria causar rpoblemas de concurrencia
            for await (const file of files) { 
              if (file.includes("Rutas_")) {
                const sourceFile = path.join( sourceFolder,file);
                const destFile = path.join(destFolder,file);

                //Mover archivos procesados
                await this.Move(sourceFile, destFile);
             
              }
                
            }

            //Enviado a actualizar
            await this.ImportTomaEstados();
        
          } else {
            Helper.LogErrorFull(
              "Error al leer carpeta : " +
                AppSettings.Instance.setting.sourceFolder,
              err
            );
          }
        }

      );
      console.log( colors.yellow(` End process  ${sourceFolder}`) );

    } catch (error) {
      Helper.LogErrorFull("Error al leer carpeta de Toma Estados", error);
    }
  }
  public async DoWork2(): Promise<void> {
    const sourceFolder = path.join(
      AppSettings.Instance.setting.sourceFolder,  Helper.getPeriodo()
    );
    const destFolder= path.join(
      AppSettings.Instance.setting.destFolder,  Helper.getPeriodo()
    );



    try {
      Helper.Log(`start process reading  ${sourceFolder}` )
      // dentro de la lectura del directorio
      let files = await this.ReadSourceFolder(sourceFolder);
      if(files){
        console.log( colors.yellow(`----- moving ${files.lenght} files  ${sourceFolder}`) );
        for await (const file of files) { 
          if (file.includes("Rutas_")) {
            const sourceFile = path.join( sourceFolder,file);
            const destFile = path.join(destFolder,file);
  
            //Mover archivos procesados
            await this.Move(sourceFile, destFile);
         
          }
            
        }
        console.log( colors.yellow(`----- calling API  period ${Helper.getPeriodo()}`));
        await this.ImportTomaEstados();
      }
      
  

      
      console.log( colors.yellow(` End process  ${sourceFolder}`) );

    } catch (error) {
      Helper.LogErrorFull("Error al leer carpeta de Toma Estados", error);
    }
  }
  private async Move(source: string, dest: string): Promise<any> {
    try {
      mv(source, dest, { mkdirp: true }, function (err:any) {
        //   // DONE : it first created all the necessary directories, and then
        //   // tried fs.rename, then falls back to using ncp to copy the dir
        //   // to dest and then rimraf to remove the source dir
        Helper.Log("File moved successfully : " + dest);
      });
    } catch (error) {
      Helper.LogError("Error moving file " + Helper.GetError(error));
    }

    return new Promise<any>(async (resolve, reject) => {
      //      console.log("------------FIN LECTURA ---------------");
      resolve("Moved");
    });
  }

  // const  ReadSourceFolder = (sourceFolder: string) => {
  private async ReadSourceFolder(sourceFolder: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            
    try {
      
      // dentro de la lectura del directorio
       fs.readdir(  sourceFolder,async (err:any, files:string[]) => {
          if (!err) {
            
            resolve(files);
        
          } else {
            // Helper.LogErrorFull(
            //   "Error al leer carpeta : " +
            //     AppSettings.Instance.setting.sourceFolder,
            //   err
            // );
            reject (err);
          }
        }

      );
      

    } catch (error) {
      reject("Error al leer carpeta de Toma Estados" + error.Message);
    }
          });
  
  }


  private async ImportTomaEstados(): Promise<void> {
    const url = AppSettings.Instance.setting.apiUrlBase + "api/TomaEstados/import";

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
 
    const data = this.GenerateData();
    const message = ` ----------Send to API TomaEstados Period:  ${data.year}_${data.month} `;
    console.log(colors.blue(message + Helper.getTime_Iso()));

    await axios
      .post(url, data, {
        httpsAgent: agent,
      })
      .then(async (res) => {
    
        Helper.Log(`Period ${data.year}_${data.month} imported sussefully`);
      
      })
      .catch(function (error) {
        Helper.LogErrorFull(`Period ${data.year}_${data.month} finalized with errors :`, error);
      });
  }
  

    GenerateData ():any {
    const fecha = new Date();
    const data = {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1
    };

    return data;
  }

}
