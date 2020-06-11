import HomePage from '../home/Home';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import Main from '../Main';

const routes = [
      {
        path: '/',
        exact: true,
        component:HomePage,
        fetchInitialData:(path = '') =>{new Promise( (resolve,reject) => {
          resolve(true);
      })}
      },
      {
        path: '/page/:pageno',
        component:HomePage,
        fetchInitialData:(path = '') =>{new Promise( (resolve,reject) => {
          resolve(true);
      })}
      },
      {
        path: '/main',
        component:Main,
        fetchInitialData:(path = '') =>{new Promise( (resolve,reject) => {
          resolve(true);
      })}
      },
      {
        path: '/signup',
        component:Signup,
        fetchInitialData:(path = '') =>{new Promise( (resolve,reject) => {
          resolve(true);
      })}
      },
      {
        path: '/login',
        component:Login,
        fetchInitialData:(path = '') =>{new Promise( (resolve,reject) => {
          resolve(true);
      })}
      }
    ]

    export default routes
