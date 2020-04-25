import React from "react";
import Note from "../Note/Note";
import NoteContext from "../NoteContext";

export default class NotePageMain extends React.Component {
  static contextType = NoteContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`);
  };

  render() {
    // Find the note that has the same id from the url (:noteId)
    const selectedNote = this.context.notes.find(
      note => note.id === this.props.match.params.noteId
    );
    return (
      <div className="Main">
        <Note
          id={selectedNote.id}
          folderId={selectedNote.folderId}
          name={selectedNote.name}
          modified={selectedNote.modified}
          onDeleteNote={this.handleDeleteNote}
          history={this.props.history}
        />
        <p>{selectedNote.content}</p>
      </div>
    );
  }
}
