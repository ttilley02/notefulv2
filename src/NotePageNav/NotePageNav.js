import React from "react";
import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";

export default class NotePageNav extends React.Component {
  static contextType = NoteContext;

  render() {
    //find the id of the note that matches the noteId from the url
    const selectedFolderId = this.context.notes.find(
      note => note.id === this.props.match.params.noteId
    ).folderId;

    // find the folder with the id that matches 'selectedFolderId'
    const selectedFolder = this.context.folders.find(
      folder => folder.id === selectedFolderId
    );
    console.log(selectedFolder);

    return (
      <div className="Sidebar">
        <Link className="addButton" to="/">
          Go Back
        </Link>
        <h2>Current Folder: {selectedFolder.name}</h2>
      </div>
    );
  }
}
