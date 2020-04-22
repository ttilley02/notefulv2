import React from 'react'
import ValidationError from '../ValidationError'
import '../App.css';
import { Link } from 'react-router-dom'



export default class AddFolder extends React.Component{

    validateFolderName() {
        const name = this.props.errorCheck.folderName.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length > 32) {
          return 'Name must be less than 32 characters long';
        }
      }

    render(){

        return(
        <div>
          <form className="AddFolder" onSubmit={e => this.props.handleSubmitFolder(e)}>
              <h2>Add Folder</h2>
              <div className="folder__hint"></div>  
              <div className="form-group">
                  <label htmlFor="name">Name : </label>
                  <input type="text" className="folderName__control"
                  name="name" id="name" value={this.props.errorCheck.folderName.value} onChange={this.props.updateAddFolderName} required/>
                  {this.props.errorCheck.folderName.touched && (
                  <ValidationError message={this.validateFolderName()}/>
                  )}
              </div>
              <button type='submit' disabled={this.validateFolderName()}>
                Submit
              </button>
          </form>
           <Link className='addButton' to='/'>Go Back</Link>
        </div>
        )
    }
}

