import React from 'react'
import ValidationError from '../ValidationError'



export default class AddNote extends React.Component{
    static defaultProps = {
        folderList: [
          {
            "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
            "name": "Important"
          },
          {
            "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
            "name": "Important"
          }
         ]
        }

    
    validateNoteName() {
        const name = this.props.errorCheck.noteName.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length > 32) {
          return 'Name must be less than 32 characters long';
        }
      }




    render(){
        console.log(this.props.folderList[0].id)
        const folderOptions = Object.keys(this.props.folderList).map((folder, index)=>{
            return(
                <option key ={index} value={this.props.folderList[folder].name}>
                    {this.props.folderList[folder].name}
                </option>
            )

        })
        

        return(
        <form className="AddNote" onSubmit={e => this.props.handleSubmit(e)}>
            <h2>Add Note</h2>
            <div className="note__hint"></div>  
            <div className="form-group">
                <label htmlFor="name">Name : </label>
                <input type="text" className="noteName__control"
                name="name" id="name" onChange={this.props.updateAddNoteName}/>
                {this.props.errorCheck.noteName.touched && (
                <ValidationError message={this.validateNoteName()}/>
                )}
            </div>
            <div className="note__hint"></div>  
            <div className="form-group">
                <label htmlFor="name">Content: </label>
                <textarea type="text" className="noteConte__control"
                name="name" id="name" onChange={this.props.updateAddNoteContent} required/>
            </div>
            <select id="folderChoice" name="Folder">
            <option value="None">Select one...</option>
            {folderOptions}
            </select>
            <button type='submit'>
              Add Note
            </button>
        </form>
  
        )
    }

}

