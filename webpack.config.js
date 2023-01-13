'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: { //какие модули используем
    rules: [ //правила
      {
        test: /\.m?js$/, //находим js-ные файлы
        exclude: /(node_modules|bower_components)/, //те файлы, кот-е исключаем
        use: { //как и что будем использовать
          loader: 'babel-loader', //loader-доп. небольшая технология, кот-я связывает webpack вместе с babel
          options: { //опции
            presets: [['@babel/preset-env', { //исп-й пресет. preset-env - самый распространенный
                debug: true, //во время компиляции позволяет увидеть что происходит
                corejs: 3, // 3-я версия corejs.
                useBuiltIns: "usage" //для выбора тех полифилов, кот-е действительно нужны
            }]]
          }
        }
      }
    ]
  }
};
