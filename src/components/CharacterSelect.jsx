import { Redirect } from "react-router-dom";
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
      loadingCharacters: true
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
  selectCharacter(characterId) {
    this.props.selectCharacter(characterId);
  }
  render() {
    if (this.props.selectedCharacter !== "") {
      return <Redirect to="/playSilhouette" />;
    }
    let characters = [];
    if (this.state.characters) {
      for (let i = 0; i < this.state.characters.length; i++) {
        /* eslint-disable react/no-children-prop */
        characters.push(
          <button
            type="button"
            className="list-group-item list-group-item-action"
            key={this.state.characters[i].characterId}
            onClick={() => {
              this.selectCharacter(this.state.characters[i].characterId);
            }}>
            {this.state.characters[i].name}
          </button>
        );
      }
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
            <div className="list-group">{characters}</div>
          </LoadingOverlay>
          <button
            className="btb btn-lg btn-block"
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
