
# components
 **types/node**
'require'.   Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.ts(2580)

 **config/settings**
    npm install dotenv --save
 **nodemon** is a tool that helps develop node.js based applications by `automatically restarting` the node application when file changes in the 
 
    para que reconozca los ts. hay q instalar:  
        `npm install -g ts-node`
    
 directory are detected.
    "scripts": {
               "start": "tsc && nodemon  --tls-min-v1.0   dist/app.js",
            "prod": "node app"}
        }

    configure: 
      a)package.json{
                    "nodemonConfig": {
                     "ignore": ["test/*", "docs/*"],
                    "delay": "2500"
            }
      }
          
      b)  nodemon.json

       If you specify a --config file or provide a local nodemon.json any package.json config is ignored.


# webpack
 configura webpack para que todos los modulos nativos que no son requeridos se transpilen e incluyan en el paquete
  -d PARA Q LO META EN devDependencies

 npm i -D webpack webpack-cli webpack webpack-node-externals babel-loader @babel/core @babel/preset-env
 npm i webpack-node-externals

instalamos dependencia de produccion para que agregue los pollyfills : dado que existen objetos globales como pormise maps etc y metodos estaticos array.map que no estan traducidos par alos navegadores
 npm i core-js --> esto metera codigo en nuestro package final
# dependences installed
    
    1 dayjs 

    2 typescript-logging : TypeScript library for logging. Simple and flexible in usage.
          https://www.npmjs.com/package/typescript-logging

    3 cron guru : service scheduler 
        https://crontab.guru/
        https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples

    4 
    `fs` -->     For file management : Note:  doesn’t work correctly on cross partitions or virtual file        systems.
      `mv` -->  To move files correctly across all platforms  
     npm install mv
     this  `mv` first tries fs.rename() method then fallbacks to piping a source file to the destination folder and deletes the source file.
     

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


