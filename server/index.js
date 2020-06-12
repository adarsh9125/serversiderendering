import path from 'path';
import fs from 'fs';
import React from 'react';
import { compose, createStore, applyMiddleware } from "redux";
import express from 'express';
import {renderToString} from 'react-dom/server';
import { matchPath,StaticRouter} from "react-router-dom";
import allReducers from "../src/reducers";
import routes from '../src/component/routes/Routes';
import App from '../src/App'

const PORT = process.env.PORT || 3006;
const app = express();
app.use(express.static('./build'));

app.get('/*', (req, res) => {
  console.log("req.path=====>",req.path,"req.url=============>",req.url);
  console.log("routes=========>",routes);
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()
  const store = createStore(allReducers)
  // promise.then((data)=>{
    const staticContext = {  }
    const markup = renderToString(
        <StaticRouter location={req.url} context={staticContext}>
         <App />
         </StaticRouter>
      );
  //const indexFile = path.resolve('./build/index.html');
  const indexFile = path.resolve('./index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    );
  });
// });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});