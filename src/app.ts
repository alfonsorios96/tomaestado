import { Helper } from './helper';
import  { ImportadorTomaEstado } from './service';
import { AppSettings } from './settings';

const importer = new ImportadorTomaEstado();



init().then(()=>{
    importer.Start();
});


// init().then(()=>{
//     importer.StartTest().then((res)=>{
//      });
// });

 
async function init() {
      try {
        let setting =  await AppSettings.Create();
        
        Helper.Log('Initializing ....');
        console.log(setting.setting );
      } catch (error) {
        Helper.LogError(`Got an error trying to write to a file: ${error.message}`);
        console.error(`Got an error trying to write to a file: ${error.message}`);
      }
    }