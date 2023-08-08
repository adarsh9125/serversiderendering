This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### `SSR Steps`
1) Chnage File: src/index.js
   change render to hydrate like
   code:-
   ReactDom.render(<App />, document.getElementById('root'))
   To
   ReactDom.hydrate(<App />, document.getElementById('root'))
--------------------------------------------------------------------------------------------------------------------
2) npm install express
3) Create server folder inside project.
   then add two files :- index.js,server.js
4) npm install @babel/register @babel/preset-env @babel/preset-react ignore-styles
   -----------------------------------------------------------------------------------------------------------------
5) Add file:- index.js
   `code:-`
   
   require('ignore-styles')
   require('@babel-register')({
    ignore: [/(node_modules)/],
    preset: ['@babel/preset-env', '@babel/preset-react']
   })
   require('./server.js')
