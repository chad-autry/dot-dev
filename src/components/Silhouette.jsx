import { Redirect } from "react-router-dom";
import React from "react";
import Grid from "character-perspective-client/src/Grid.jsx";
import moment from "moment";

/* global firebase*/
const Silhouette = class Silhouette extends React.Component {
  constructor(props) {
    super(props);
    let initialGrid = [...Array(9)].map(() => Array(9).fill(""));
    // This line is important!
    this.logonFIrebase = this.logonFirebase.bind(this);
    this.regenerateView = this.regenerateView.bind(this);
    this.setupView = this.setupView.bind(this);
    this.state = {
      grid: initialGrid
    };
  }

  regenerateView() {
    this.props.fetchService.getJsonWithAuth(
      "/regenerateView",
      "application/json",
      () => {
        //Success
        // eslint-disable-next-line no-console
        console.log("async regenerate view");
      },
      json => {
        //Failure
        // eslint-disable-next-line no-console
        console.log(JSON.parse(json));
      },
      { characterId: this.props.selectedCharacter }
    );
  }

  setupView() {
    firebase
      .firestore()
      .collection("characters")
      .doc(this.props.selectedCharacter)
      .collection("views")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .orderBy("createTs", "desc")
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // eslint-disable-next-line no-console
          console.log(doc.id, " => ", doc.data().grid);
          this.setState({
            grid: JSON.parse(doc.data().grid)
          });
        });
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log("Error getting documents: ", error);
      });

    this.unsubscribeListener = firebase
      .firestore()
      .collection("characters")
      .doc(this.props.selectedCharacter)
      .collection("views")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .where("createTs", ">", moment().unix())
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // eslint-disable-next-line no-console
          console.log(doc.id, " => ", doc.data().grid);
          this.setState({
            grid: JSON.parse(doc.data().grid)
          });
        });
      });
  }

  logonFirebase() {
    var user = firebase.auth().currentUser;

    if (user) {
      this.setupView();
    } else {
      this.props.fetchService.getJsonWithAuth(
        "/getFirebaseLoginToken",
        "application/json",
        json => {
          firebase
            .auth()
            .signInWithCustomToken(json.token)
            .then(() => {
              this.setupView();
            })
            .catch(function(error) {
              // Handle Errors here.
              // eslint-disable-next-line no-console
              console.error(JSON.stringify(error, undefined, 2));
            });
        },
        error => {
          // eslint-disable-next-line no-console
          console.log("Error getting documents: ", error);
        }
      ); // No user is signed in.
    }
  }
  render() {
    if (this.props.selectedCharacter === "") {
      return <Redirect to="/characterSelect" />;
    }
    return (
      <div className="center-form panel">
        <div className="panel-body">
          <Grid gridData={this.state.grid} gridWidth={9} gridHeight={9} />
          <button
            className="btb btn-lg btn-block"
            onClick={() => {
              this.regenerateView();
            }}>
            Regenerate View
          </button>
          <button
            className="btb btn-lg btn-block"
            onClick={() => {
              this.props.logoutCharacter();
            }}>
            Logout Character
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.logonFirebase();
  }
  componentWillUnmount() {
    if (this.unsubscribeListener) {
      this.unsubscribeListener();
    }
  }
};

export default Silhouette;
