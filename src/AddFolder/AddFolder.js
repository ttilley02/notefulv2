import React from "react";
import ValidationError from "../ValidationError";
import "../App.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class AddFolder extends React.Component {
  validateFolderName() {
    const name = this.props.state.folderName.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length > 32) {
      return "Name must be less than 32 characters long";
    }
  }

  handleSubmitFolder = event => {
    event.preventDefault();
    let folderInput = {
      id: "",
      name: this.props.state.folderName.value,
      modified: ""
    };
    console.log("Adding folder " + folderInput.name);
    fetch(`http://localhost:9090/folders/`, {
      method: "POST",
      body: JSON.stringify(folderInput),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        this.props.AddFolder(folderInput);
        console.log(folderInput);
      })
      .then(() => {
        this.props.clearFolderName();
        this.props.history.push("/");
      })

      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <form className="AddFolder" onSubmit={e => this.handleSubmitFolder(e)}>
          <h2>Add Folder</h2>
          <div className="folder__hint" />
          <div className="form-group">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              className="folderName__control"
              name="name"
              id="name"
              value={this.props.state.folderName.value}
              onChange={this.props.updateAddFolderName}
              required
            />
            {this.props.state.folderName.touched && (
              <ValidationError message={this.validateFolderName()} />
            )}
          </div>
          <button type="submit" disabled={this.validateFolderName()}>
            Submit
          </button>
        </form>
        <Link className="addButton" to="/">
          Go Back
        </Link>
      </div>
    );
  }
}

AddFolder.propTypes = {
  updateAddFolderName: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  clearFolderName: PropTypes.func.isRequired
};
