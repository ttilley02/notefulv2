import React from 'react';
import './App.css';
import STORE from './dummyStore'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Link } from 'react-router-dom'
import NoteContext  from './NoteContext'
import AddNote from './AddNote/AddNote';



class App extends React.Component {


  state = {STORE,value:''}
  
  
  componentDidMount(){
    //fetch request for folders
    fetch('http://localhost:9090/folders')
      .then(response => response.json())
        .then(data =>{
           //store response in this.state.folders
          this.setState({
            folders : data
          })
        })
        
    //fetch request for notes
        fetch('http://localhost:9090/notes')
        .then(response => response.json())
          .then(data =>{
            //store response in this.state.folders
            this.setState({
              notes : data
            })
          })
        }
      
  deleteNotefromPage = id => {  
    const newNoteList = this.state.notes.filter(note =>
      note.id !== id
    )
   
    this.setState({
      notes: newNoteList
    })
  }

  handleChange = (event)=> {
   
    this.setState({value: event.target.value});
    
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const newItem={id:1+Math.random(), name:this.state.value}
    
  
    
      
      
  }

  render() {
    const contextValue =  { 
    folders:this.state.folders,
    notes:this.state.notes,
    deleteNotefromPage: this.deleteNotefromPage
  }


    return (
      <NoteContext.Provider value={contextValue}>
        <div className="App">
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>

          <aside>
            {/* Show/hide components in SIDEBAR section based on route */}
            {/* Main Route */}
            <Route
              exact
              path='/'
              render={() =>
                // Pass in the entire folders array from state as a prop
                <NoteListNav folders={this.state.folders} />
              }
            />
            {/* Folder Route */}
            <Route
              exact
              path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
              render={(props) =>
                // folders prop will be entire folders array from state
                // selected prop will be the id from the url (:folderId)
                <NoteListNav folders={this.state.folders} selected={props.match.params.folderId} />
              }
            />
            {/* Note Route */}
            <Route
              exact
              path='/notes/:noteId'
              component={NotePageNav}
            />
          </aside>
          <main>
            {/* Show/hide components in 'MAIN' section based on route */}
            {/* Main Route */}
            <Route
              exact
              path='/'
              render={() =>
                // 'notes' prop will be entire notes array from state
                <NoteListMain notes={this.state.notes} />
              }
            />
            {/* Folder Route */}
            <Route
              exact
              path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
              render={(props) => {
                return (
                  /*
                  'notes' prop will be all the notes that have a folderId
                  that matches the value passed as :folderId in the url
                  */
                  <NoteListMain
                    notes={this.state.notes.filter(
                      note => note.folderId === props.match.params.folderId
                    )}
                  />
                )
              }}
            />
            {/* Note Route */}
            <Route
              exact
              path='/notes/:noteId'
              component={NotePageMain}
            />
              {/* Add Note Route */}
              <Route
              exact
              path='/AddNote'
              render={() => {
                return (
                  <AddNote
                  handleChange = {this.handleChange}
                  handleSubmit={this.handleSubmit}


                  />
                )
              }}
            />
          </main>
        </div>
      </NoteContext.Provider>
        
    );
  }
}

export default App;
