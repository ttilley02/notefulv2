import React from "react";
import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";
import PropTypes from "prop-types";
import "../App.css";

// Found this on stack overflow: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
function formatDate(date) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
}

export default class Note extends React.Component {
  static contextType = NoteContext;

  DeleteNote = (id, cb) => {
    console.log("Deleting note with the ID " + id);
    fetch(`http://localhost:9090/notes/` + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state

        cb(id);
        this.history.props.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const modified = formatDate(new Date(this.props.modified));
    return (
      <li className="Note">
        <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        <div>
          <p>Last modified: {modified}</p>

          <button
            onClick={() => {
              this.DeleteNote(this.props.id, this.context.deleteNotefromPage);
            }}
          >
            Delete Note
          </button>
        </div>
      </li>
    );
  }
}

Note.PropTypes = {
  id: PropTypes.number.isRequired,
  folderId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
