const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    //target : 'node',
    mode: "production",
    entry :{
        app: path.resolve(__dirname,'src','app.ts') 
        // app: path.resolve(__dirname, 'src/app.ts'),
        
    },
    output : {
        
        path: path.resolve(__dirname,'dist') ,
        //filename: '[name].[contenthash].bundle.js',        // generara un hash diferente con cada compilado para que no quede en la cache de los navegadores
        filename: 'bundle.js',


        
    },

    
     externals:[nodeExternals()], // configura webpack para que todos los modulos nativos que no son requeridos se transpilen e incluyan en el paquete
    module :{
        rules: [{

            test: /\.(ts|tsx)$/i,
            loader: 'ts-loader',
            exclude: ['/node_modules/'],
            },
       
        ]
    },
    resolve: {
        modules: [],
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "readline": false,

          } 
   
      }
}