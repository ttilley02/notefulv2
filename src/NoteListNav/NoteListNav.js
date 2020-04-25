import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";

// This component is rendered in the sidebar for the '/' and 'folder/:folderId' routes
export default class NoteListNav extends React.Component {
  static contextType = NoteContext;

  render() {
    return (
      <div className="Sidebar">
        <h2>Folders</h2>
        <ul>
          {/* Loop through the array of folders passed as a prop */}
          {this.props.folders.map(folder => {
            /* for each folder in the array, set variable 'classes' as either
            'folder' or 'folder' AND 'selected'. If the selected folderId is
            the same as the id of the current folder in the array, then add 'selected' to classes
            */
            const classes =
              this.props.selected === folder.id ? "folder selected" : "folder";

            // Create list item for each folder in the array
            return (
              <li key={folder.id}>
                <Link className={classes} to={`/folders/${folder.id}`}>
                  {folder.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link className="addButton" to="/AddFolder">
          New Folder
        </Link>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
};

NoteListNav.propTypes = {
  folders: PropTypes.object.required,
  selected: PropTypes.object.required
};
