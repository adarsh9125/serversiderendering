import axiosConfig from '../axiosconfig/axiosConfig';
import axios from 'axios';

export const selectUser = (vendor) => {
    console.log("You clicked on user: ");
    return {
        type: 'USER_SELECTED',
        payload: vendor,
    }
};

export const requestPost = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'REQUEST_POSTS',
        payload: user,
    }
};


export const requestGet = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'REQUEST_GET',
        payload: user,
    }
};


export const getAllnews = (pageno) => {
    console.log("You clicked on getAllnews: ");
    let apiUrl = 'http://hn.algolia.com/api/v1/search?query=foo&tags=story&page='+pageno;
    // let apiUrl = '?query=foo&tags=story&page=2';
    return (dispatch, getState) => {
        // dispatch(fetchvendorRequest());
        console.log("inside thunk midleware....");
        return axios.get(apiUrl)
          .then( (response)=> {
            const newslist = response.data;
            console.log("newslist====>",newslist);
            dispatch(newslistfunc(newslist));
          })
          .catch(function (error) {
            console.log("newslist====>",error.message);
            dispatch(requestError(error.message));
          });
    }
};



export const makesignuprequest = (reqparams) => {
    console.log("You clicked on getvendors: ",reqparams);
   
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.post('vendors/',{...reqparams})
          .then( (response)=> {
            dispatch(successResponse());
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getAllvendors = (prams) => {
    console.log("You clicked on getvendors: ",prams);
    return (dispatch, getState) => {
        // dispatch(makeRequest());
        return axiosConfig.get('vendors/')
          .then( (response)=> {
            dispatch(vendorListSuccessResponse(response.data));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getExistingSubCategory = (prams) => {
    console.log("You clicked on getExistingSubCategory: ",prams);
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.get('category/vendor/3')
          .then( (response)=> {
            dispatch(categorySuccessResponse(response.data));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getExistingCategory = (prams) => {
    console.log("You clicked on getExistingCategory: ",prams);
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.get('category/vendor/3')
          .then( (response)=> {
            dispatch(subCategorySuccessResponse(response.data));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

const requestError = (error) => {
    return {
        type: 'API_ERROR',
        payload: {"message":error,loading:false},
    }
};


const newslistfunc = (response) => {
    return {
        type: 'NEWS_LIST',
        payload: {newslist:response},
    }
};

const makeRequest = () => {
    return {
        type: 'MAKE_REQUEST',
        payload: {"message":"",loading:true},
    }
};

const orderPlacesuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {loading:false,message:data.message},
    }
};

const successResponse = () => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {loading:false,message:"Vendor registered successfully."},
    }
};

const vendorListSuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {...data},
    }
};

const categorySuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {...data},
    }
};

const subCategorySuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {...data},
    }
};

export const makelogoutrequest = () => {
    let loginstatus = (localStorage.getItem('user') != null)?true:false;
    return {
        type: 'LOGOUT',
        payload: {islogin:loginstatus},
    }
};

export const makeloginrequest = () => {
    let loginstatus = (localStorage.getItem('user') != null)?true:false;
    return {
        type: 'LOGIN',
        payload: {islogin:loginstatus},
    }
};

// dispatch(requestPosts());
export const selectUserbythunk = (user) => {
    console.log("You clicked on user: ", user.first);
    return function (dispatch) {
        axiosConfig.get('users')
        .then(function (response) {
          // handle success
          console.log("adarsh==================>1",response);
          dispatch(selectUser(user));
        })
        .catch(function (error) {
          // handle error
          dispatch(requestError());
        })
        .finally(function () {
            //dispatch(selectUser());
        });
      };
};