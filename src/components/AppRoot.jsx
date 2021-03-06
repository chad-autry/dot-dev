import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";
import React from "react";
import AuthorizingRoute from "./AuthorizingRoute.jsx";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login.jsx";
import UserManagement from "./UserManagement.jsx";
import Home from "./Home.jsx";
import Policy from "./Policy.jsx";
import CharacterSelect from "./CharacterSelect.jsx";
import Silhouette from "./Silhouette.jsx";

const AppRoot = class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    //Register for Authentication state changes
    this.props.authService.onAuthChange(() => {
      let isAuthenticated = this.props.authService.isAuthenticated();
      let pendingUserCreation = !!this.props.authService.getPayload()
        .pendingUserCreation;
      this.setState({
        pendingUserCreation: isAuthenticated && pendingUserCreation,
        isAuthenticated: isAuthenticated && !pendingUserCreation
      });
    });
    this.props.fetchService.listen("/newUser", beginRequest => {
      this.setState({
        fetchingPolicyAccepted: beginRequest
      });
    });
    this.props.fetchService.listen("/backend/login", beginRequest => {
      this.setState({
        logingOn: beginRequest
      });
    });
    this.state = {
      fetchingPolicyAccepted: false,
      selectedCharacter: "",
      pendingUserCreation:
        this.props.authService.isAuthenticated() &&
        !!this.props.authService.getPayload().pendingUserCreation,
      isAuthenticated:
        this.props.authService.isAuthenticated() &&
        !this.props.authService.getPayload().pendingUserCreation
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <NavBar
          authService={this.props.authService}
          pendingUserCreation={this.state.pendingUserCreation}
          isAuthenticated={this.state.isAuthenticated}
          selectedCharacter={this.state.selectedCharacter}
          location={this.props.location}
        />
        <Switch>
          <Route path="/home" component={Home} />
          <Route
            path="/login"
            render={routeProps => (
              <Login
                isAuthenticated={this.state.isAuthenticated}
                pendingUserCreation={this.state.pendingUserCreation}
                fetchService={this.props.fetchService}
                logingOn={this.state.logingOn}
                authService={this.props.authService}
                {...routeProps}
              />
            )}
          />
          <Route
            path="/policy"
            render={routeProps => (
              <Policy
                isAuthenticated={this.state.isAuthenticated}
                pendingUserCreation={this.state.pendingUserCreation}
                fetchingPolicyAccepted={this.state.fetchingPolicyAccepted}
                fetchService={this.props.fetchService}
                authService={this.props.authService}
                {...routeProps}
              />
            )}
          />
          <AuthorizingRoute
            path="/characterSelect"
            authService={this.props.authService}
            fetchService={this.props.fetchService}
            component={CharacterSelect}
            selectCharacter={characterId =>
              this.setState({ selectedCharacter: characterId })
            }
            selectedCharacter={this.state.selectedCharacter}
          />
          <AuthorizingRoute
            path="/playSilhouette"
            authService={this.props.authService}
            fetchService={this.props.fetchService}
            selectedCharacter={this.state.selectedCharacter}
            logoutCharacter={() => this.setState({ selectedCharacter: "" })}
            component={Silhouette}
          />
          <AuthorizingRoute
            path="/userMgmnt"
            authService={this.props.authService}
            fetchService={this.props.fetchService}
            component={UserManagement}
          />
          <Redirect from="*" to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
};

export default AppRoot;
