import React from 'react';

import Note from '../Note/Note';
import {Link } from 'react-router-dom'

class NoteListMain extends React.Component {

  render() {
    return (
      <div className="Main">
        <h2>Notes</h2>
        <ul>
          {this.props.notes.map((note) => {
            return (
              <Note modified={note.modified} key={note.id} id={note.id } name={note.name} />
            )
          })}
        </ul>
        <Link to='/AddNote'>New Note</Link>
      </div>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
}

export default NoteListMain;
