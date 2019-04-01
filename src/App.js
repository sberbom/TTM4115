import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Signin from './components/signin/signin';
import { Button, FormGroup, Label, Input } from 'reactstrap';

//TODO
//Need screen for register user
//Need som confirmation when logging on
//Need functionality for onLetIn and onKeepClose

class App extends Component {
  constructor(){
    super();
    this.state={
      route: "home",
      isSignedIn: false,
      user:{
        name:{}
      },
      displayText: "Welcome"
    }
  }

  onSignIn = (username) => {
    //make sure the user is confirmed
    this.setState({isSignedIn: true,
    user: {name :username}})
  }

  onSignOut = () => {
    this.setState({isSignedIn: false,
      user: {name: {}}});
  }

  onChange = (event) => {
    this.setState({displayText: event.target.value});
  }

  onClick = () => {
    this.setState({displayText: ""});
  }

  onLetIn = () => {
    //add functionality
    const display = this.state.displayText
    console.log("Let inn \nDisplay text: " + display)
    
    // POST to server
    this.postToServer(true)
    
  }
  
  postToServer = (letIn) => {
    // TODO: find correct IP address
    fetch("127.0.0.1", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        openDoor: letIn,
        message: this.state.displayText
      })
    })
  }

  onKeepClose = () => {
    //add functionality
    const display = this.state.displayText
    console.log("Keep close \nDisplay text: " + display)
    
    // POST to server
    this.postToServer(false)
  }

  render() {
    return (
      <div>
        <Navbar 
        isSignedIn={this.state.isSignedIn}
        onSignOut={this.onSignOut}/>
       {this.state.isSignedIn===false && 
          <Signin
          onSignIn={this.onSignIn}/>
        }

        {this.state.isSignedIn===true && 
          <div>
            <img className="doorImg" src="https://upload.wikimedia.org/wikipedia/commons/4/48/Peephole.jpg" alt="who is on the door)"/>
            <FormGroup className="input">
              <Label>Display text: </Label>
              <Input type="textarea" 
                name="text" 
                id="exampleText"
                value={this.state.displayText} 
                onChange={this.onChange}
                onClick={this.onClick} 
                />
            </FormGroup>
            <div className="buttons">
              <Button 
                className="button" 
                color="success"
                onClick={this.onLetIn}>
                  Open
              </Button>
              <Button 
                className="button" 
                color="danger"
                onClick={this.onKeepClose}>
                  Decline
              </Button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
