import React from 'react';
import './App.css';
import STORE from './dummyStore'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Link } from 'react-router-dom'
import NoteContext  from './NoteContext'
import AddNote from './AddNote/AddNote'
import AddFolder from './AddFolder/AddFolder'




class App extends React.Component {
  static contextType = NoteContext;

  state = {
    STORE,
    noteName: {
        value: '',
        touched: false
    },
    noteContent: {
      value: '',
      touched: false
    },
    noteFolder: {
      value: '',
      touched: false
    },
    folderName: {
      value: '',
      touched: false
    },
  }
    

  

  
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
   this.setState({
        notes: this.state.notes.filter(note => note.id !== id)
    });
  };

  updateAddNoteName = (event)=> {
    this.setState({noteName: {value: event.target.value,touched: true}});
   
  }

  updateAddNoteContent = (event)=> {
    this.setState({noteContent: {value: event.target.value,touched: true}});
   
  }

  folderSelection = (event)=> {
    this.setState({noteFolder: {value: event.target.value,touched: true}});
  
    
  }
  handleSubmit = (event) => {
    event.preventDefault();
    
     let folderIdResult = Object.values(this.state.folders).find(folder => folder.name === this.state.noteFolder.value )
     console.log(folderIdResult)
     const min = 1;
     const max = 10000;
     const generatedId = min + Math.random() * (max - min);
     let newDate = new Date()
     
    let noteInput =
    {
      "id": generatedId,
      "name": this.state.noteName.value,
      "modified": newDate,
      "folderId": folderIdResult.id,
      "content": this.state.noteContent.value
    }
    console.log("Adding note "+ noteInput.name)
    fetch(`http://localhost:9090/notes/`, {
    method: 'POST',
    body: JSON.stringify(noteInput),
    headers: {
      'content-type': 'application/json'
    },
  })
  .then(res => {
    if (!res.ok) {
      // get the error message from the response,
      return res.json().then(error => {
        // then throw it
        throw error
      })
    }
    return res.json()
  })
  .then(() => {
    this.setState({
      noteName: {value: '',touched: false},
      noteContent: {value: '',touched: false},
    });
    
  })
  .catch(error => {
    console.error(error)
  })
  fetch('http://localhost:9090/notes')
  .then(response => response.json())
    .then(data =>{
      //store response in this.state.folders
      this.setState({
        notes : data
      })
    })
  // .then(this.props.history.push('/'))
  }
 
  

  updateAddFolderName = (event)=> {
  this.setState({folderName: {value: event.target.value,touched: true}});
  }

  handleSubmitFolder = (event) => {
    event.preventDefault();
    let folderInput =
    {
      "id": '',
      "name": this.state.folderName.value,
      "modified": '',

    }
    console.log("Adding folder "+ folderInput.name)
    fetch(`http://localhost:9090/folders/`, {
    method: 'POST',
    body: JSON.stringify(folderInput),
    headers: {
      'content-type': 'application/json'
    },
  })
  .then(res => {
    if (!res.ok) {
      // get the error message from the response,
      return res.json().then(error => {
        // then throw it
        throw error
      })
    }
    return res.json()
  })
  .then(() => {
    this.setState({folderName: {value: '',touched: false}});
    
  })
  .catch(error => {
    console.error(error)
  })
  fetch('http://localhost:9090/folders')
  .then(response => response.json())
    .then(data =>{
      //store response in this.state.folders
      this.setState({
        folders : data
      })
    })
  // .then(this.history.push('/'))
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
                  updateAddNoteName = {this.updateAddNoteName}
                  handleSubmit={this.handleSubmit}
                  updateAddNoteContent= {this.updateAddNoteContent}
                  errorCheck = {this.state}
                  folderList = {this.state.folders}
                  folderSelection ={this.folderSelection}   
                  />
                  )
                }}
                />
                <Route
                exact
                path='/AddFolder'
                render={() => {
                  return (
                    <AddFolder
                    updateAddFolderName = {this.updateAddFolderName}
                    handleSubmitFolder={this.handleSubmitFolder}
                    validateFolderName ={this.validateFolderName}
                    errorCheck = {this.state}           
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
