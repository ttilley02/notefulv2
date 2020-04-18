import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../NoteContext';

class NotePageMain extends React.Component {
  static contextType = NoteContext


  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
   
    console.log(this.context)

      // Find the note that has the same id from the url (:noteId)
    const selectedNote = this.context.notes.find(
    note => note.id === this.props.match.params.noteId
  )
    return (
      <div className="Main">
        <Note  
        id={selectedNote.id} 
        folderId={selectedNote.folderId} 
        content={selectedNote.content} 
        name={selectedNote.name} 
        modified={selectedNote.modified}
        onDelete={this.handleDeleteNote}
        />
        <p>{selectedNote.content}</p>
      </div>
    );
  }

}

/*{(props) => {
  // Find the note that has the same id from the url (:noteId)
  const selectedNote = this.state.notes.find(
    note => note.id === props.match.params.noteId
  )
  return (
    <NotePageMain {...selectedNote}/>
    // Line 104 is the exact same thing as line 102 without the spread operator (...)
    // <NotePageMain id={selectedNote.id} folderId={selectedNote.folderId} content={selectedNote.content} name={selectedNote.name} modified={selectedNote.modified}/>
  )
}}*/



export default NotePageMain;
