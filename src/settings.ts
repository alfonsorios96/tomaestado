import { Helper } from "./helper";



export class AppSettings {

  public static Instance:AppSettings;

  
    public  static async Create(): Promise<AppSettings>{

      //let setting:   AppSettings;
     if(AppSettings.Instance)
      return AppSettings.Instance;
      else
      {
        var res = await Helper.OpenFile('appsettins.json');

        AppSettings.Instance = JSON.parse(res) as AppSettings;
      }
      
      return  AppSettings.Instance;
    } 


    public setting: Setting;
}


export class Setting {
  public apiUrlBase: string;
  public sourceFolder: string;
  public destFolder: string;
}
