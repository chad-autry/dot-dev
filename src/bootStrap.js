"use strict";
//This JS file simply bootstraps the app from the root component when the window loads

var AppRoot = require('./components/AppRoot.jsx');
var Home = require('./components/Home.jsx');
var React = require('react');
var ReactDOM = require('react-dom');
var Redirect = require('react-router').Redirect;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

//Keep references to these outside of the function
var appRootComponent;

//This function executes immediately
(function() {
    
    //This function is attached to execute when the window loads
    document.addEventListener('DOMContentLoaded', function() {
        
        ReactDOM.render(
            /* jshint ignore:start */
            <Router history={browserHistory}>
                <Route path="/" component={AppRoot}>
                    <Route path="/home" component={Home}/>
                    <Redirect from="*" to="/home"/>
                </Route>
            </Router>, document.getElementById('app')
            /* jshint ignore:end */
        );

    });
})();
