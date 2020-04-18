import React from 'react'



export default class AddNote extends React.Component{
    render(){
        return(
                <div>
                <form onSubmit={this.props.handleSubmit}>
                <label>
                <input type="text" placeholder = "testing123" onChange={this.props.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                </form>
                </div>
           
        )
    }

}

