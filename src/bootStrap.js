//This JS file simply bootstraps the app from the root component when the window loads
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppRoot from "./components/AppRoot.jsx";
import authjwt from "client-auth-jwt/src/Auth.js";

//This function executes immediately
(function() {
  let authService = new authjwt();

  // Configure the authService
  authService.ProviderOAuthConfigs.google.clientId =
    "34478033913-h13qnl7mfako0ean3uv6c9s6f8ujafki.apps.googleusercontent.com";
  authService.ProviderOAuthConfigs.google.redirectUri =
    window.location.origin + "/googleStaticAuth.html";
  authService.originRmiService = { login: () => true };
  //This function is attached to execute when the window loads
  document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
      <Router basename="/">
        <Route
          render={routeProps => (
            <AppRoot
              location={routeProps.location}
              authService={authService}
              {...routeProps}
            />
          )}
        />
      </Router>,
      document.getElementById("app")
    );
  });
})();
