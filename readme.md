
# TomaEstados apps
  Ejecuta un cron-job shedduler y dentro de cada ejecución
  1 Realiza una lectura de carpeta origen `setting.sourceFolder` y busca Rutas_XXXXX que son toma estados
  2 Mueve los archivos -->`setting.destFolder`
  3 realiza una llamada API `setting.apiUrlBase/api/TomaEstados/import`
  
  
  

# install
 Crear un inicio automatico
   requiere shell:startup `invoiceServiceStart.bat`

# comments 
    shift + alt + A
    Char --> `  Alt+96

# comments 

Usa PM2

https://desarrolloweb.com/articulos/ejecutar-aplicacion-nodejs-pm2.html


# deploy and run

npm install --production

run app
    npm start
    npm run prod


