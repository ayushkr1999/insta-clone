import React, { Fragment ,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';


import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import {loadUser} from './actions/auth'; 
import setAuthToken from './utils/setAuthToken'

import PrivateRoute from './components/routing/PrivateRoute';

import FileUpload from './components/FileUpload';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/search/Search';
import Header from './components/Header/Header';
import Footer from './components/Header/Footer';
import Profile from './components/profile/Profile';
import Comments from './components/Dashboard/Comments';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = ()=>{
  
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return(
  <Provider store={store}>
  <Router>
    <Fragment>
      {/* <Navbar /> */}
     {/* <Route exact path='/' component={Landing} /> */}
     <section className='example'>
       {/* <Header /> */}
       {/* <Alert /> */}
       <Switch>
        <Route exact path='/register' component={Register}/>
         <Route exact path='/' component={Login}/>
         <PrivateRoute exact path='/dashboard' component={Dashboard}/>
         <PrivateRoute exact path='/post/:id' component={Comments}/>
         <PrivateRoute exact path='/create/post' component={FileUpload}/>
         <PrivateRoute exact path='/search' component={Search}/>
         <PrivateRoute exact path='/profile' component={Profile}/>
       </Switch>
      
     </section>
    </Fragment>
    </Router>
    </Provider>
  )  
}

export default App;




