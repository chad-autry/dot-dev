import Redirect from "react-router-dom";
import React from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import LoadingOverlay from "react-loading-overlay";

const CharacterSelect = class CharacterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToSilhouette: false, loadingCharacters: true };
    // This line is important!
    this.createCharacter = this.createCharacter.bind(this);
    this.getList = this.getList.bind(this);
  }

  getList() {
    this.props.fetchService.getJsonWithAuth(
      "/getCharacters",
      "application/json",
      json => {
        //Success
        this.setState({
          loadingCharacters: false,
          characters: json.characters
        });
      },
      json => {
        //Failure
        // eslint-disable-next-line no-console
        console.log(JSON.parse(json));
      }
    );
  }

  createCharacter() {
    this.setState({
      loadingCharacters: false
    });
    this.props.fetchService.getJsonWithAuth(
      "/createCharacter",
      "application/json",
      {},
      () => {
        this.getList();
      },
      () => {}
    );
  }

  render() {
    if (this.state.redirectToSilhouette) {
      return <Redirect to="/playSilhouette" />;
    }
    return (
      <div className="center-form panel">
        <div className="panel-body">
          <LoadingOverlay
            active={this.state.loadingCharacters}
            styles={{
              overlay: base => ({
                ...base,
                background: "rgba(0, 0, 0, 0.5)"
              })
            }}
            spinner={<LoadingSpinner />}
            text="Loading...">
            <pre>{JSON.stringify(this.state.characters, null, 4)}</pre>
          </LoadingOverlay>
          <button
            className="btb btn-lg btn-block btn-danger"
            onClick={this.createCharacter}>
            Create Character
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getList();
  }
};

export default CharacterSelect;
