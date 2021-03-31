import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import Reducer from './Reducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Rule from './Rule';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Home from "./Home";
// import mainReducer from './Reducer';


const store = createStore(Reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate}>
    <Router>
            <Switch>
                {/* exact makes sure to render ONLY the given component, since this behaves like a switch case logic */}
                <Route exact path={"/"} component={App}/>
                <Route exact path={"/rule"} component={Rule}/>
                <Route exact path={"/home"} component={Home}/>
                {/* This last case is essentially the default case.  Good to have
                if someone types in an incorrect URL.  A component can also be passed here*/}
            </Switch>
        </Router>

      {/* <App /> */}
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
