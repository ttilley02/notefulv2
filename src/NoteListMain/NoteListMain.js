import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";
import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";

export default class NoteListMain extends React.Component {
  static contextType = NoteContext;

  render() {
    return (
      <div className="Main">
        <h2>Notes</h2>
        <ul>
          {this.props.notes.map(note => {
            return (
              <Note
                modified={note.modified}
                key={note.id}
                id={note.id}
                name={note.name}
              />
            );
          })}
        </ul>
        <Link className="addButton" to="/AddNote">
          New Note
        </Link>
      </div>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
};

NoteListMain.propTypes = {
  notes: PropTypes.object.isRequired
};
