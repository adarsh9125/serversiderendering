import React from 'react';
import {Route} from 'react-router-dom'
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import createSagaMiddleware from "redux-saga";
import allReducers from "./reducers";
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import routes from "./component/routes/Routes";
import './App.css';
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line no-underscore-dangle
// console.log("window====>");
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  (applyMiddleware(thunk, sagaMiddleware, promise, logger))
  // composeEnhancers(applyMiddleware(thunk, sagaMiddleware, promise, logger))
);




class App extends React.Component {
 
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <Header/>
          {
            routes.map(({path,exact,component:C, ...rest})=>(
              <Route
              key={path}
              path={path}
              exact={exact}
              render={(props)=>(
                <C {...props} {...rest}/>
              )}
              />
            ))
          }
        <Footer/>
        </div>
      </Provider>
    );
  }
}

export default App;
