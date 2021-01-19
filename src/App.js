import React, {Component} from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';




//temas de css do MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFicheiro from './util/theme'
import jwtDecode from 'jwt-decode'; // descodificar a token do firebase


//redux
import { Provider } from 'react-redux';
import store from './redux/store'

//componentes
//import barradeNav from './components/barradeNav'; //não dava por causa do nome???????
import NavBar from './components/NavBar';
import AuthRoute from './util/AuthRoute';
import {SET_AUTHENTICATED} from './redux/types'
import {logoutUser,getUserData} from './redux/actions/userActions'
//paginas
import home from './paginas/home';
import login from './paginas/login';
import signup from './paginas/signup';
import axios from 'axios'

const theme = createMuiTheme(themeFicheiro);
//let authenticated;


const token = localStorage.FBIdToken;
if(token){
const decodedToken = jwtDecode(token);
console.log(decodedToken);
if(decodedToken.exp * 1000 < Date.now()){ //se isto for verdade significa que a token já expirou
  store.dispatch(logoutUser())
  window.location.href = '/login'
//  authenticated = false;
} else {
  store.dispatch({type: SET_AUTHENTICATED});
 // authenticated = true;

 //quando a pagina leva refresh axious e reeniciado
 axios.defaults.headers.common['Authorization'] = token;
 store.dispatch(getUserData());
}
}


function App() {
  return (
    <MuiThemeProvider theme ={theme}>
      <Provider store={store}>
      <div className="App">
     <Router>
     <NavBar/>
       <div className ="container"> 
      <Switch>
        <Route exact path ="/" component = {home}/>
        <AuthRoute exact path ="/login" component = {login}/>
        <AuthRoute exact path ="/signup" component = {signup}/>
      </Switch>
       </div>
     </Router>
    </div>
      </Provider>

    </MuiThemeProvider>
  );
}

export default App;
