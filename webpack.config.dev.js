const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode:'development',
  watch: true,
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
     //Agregamos una key alias a nuestro objeto resolve
      //para ponerles nombres mas pequenos a las extensiones
        //de nuestros archivos
        alias:{
          '@utils': path.resolve(__dirname, 'src/utils/'),
          '@templates': path.resolve(__dirname, 'src/templates/'),
          '@styles': path.resolve(__dirname, 'src/styles/'),
          '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
     // REGLAS PARA TRABAJAR CON WEBPACK
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/,
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        }
      },
      {
        //Test para identificar el CSS que debe transformar 
        test: /\.css|.styl$/i,
        //identifica el loader que será usado para transformar a dichos archivos
        use: [ MiniCssExtractPlugin.loader, 
          'css-loader', 
          'stylus-loader'
        ],
      },
      {
        test: /\.png/,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
        use: {
            loader: 'url-loader', // NOMBRE DEL LOADER
            options: {
              limit: 10000, // O LE PASAMOS UN NUMERO
              // Habilita o deshabilita la transformación de archivos en base64.
              mimetype: 'aplication/font-woff',
              // Especifica el tipo MIME con el que se alineará el archivo. 
              // Los MIME Types (Multipurpose Internet Mail Extensions)
              // son la manera standard de mandar contenido a través de la red.
              name: "[name].[contenthash].[ext]",
              // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
              // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
              // ubuntu-regularhola.woff
              outputPath: './assets/fonts/', 
              // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
              publicPath: '../assets/fonts/',
              // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
              esModule: false,
            },
        }
      }
    ]
  },
   // SECCION DE PLUGINS
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,// CONFIGURACIÓN DEL PLUGIN
        template: './public/index.html',// LA RUTA AL TEMPLATE HTML
        filename: './index.html'// NOMBRE FINAL DEL ARCHIVO
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),// INSTANCIAMOS EL PLUGIN de MiniCss
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ],
}