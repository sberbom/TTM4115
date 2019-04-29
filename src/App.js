import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Signin from './components/signin/signin';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import socketIOClient from "socket.io-client";

//TODO
//Need screen for register user

class App extends Component {
  constructor(){
    super();
    this.state={
      route: "home",
      isSignedIn: true,
      user:{
        name:{}
      },
      displayText: "Welcome",
      userdb:[
        { name: "Admin", password: "Admin"},
        { name: "Trygve", password: "Trygve"},
        { name: "Håkon", password: "Håkon"},
        { name: "Mathani", password: "Mathani"},
        { name: "Hanne", password: "Hanne"},
        { name: "Sigmund", password: "Sigmund"}
      ],
      picture: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
      pictureID:""
    }
  }

  componentDidMount() {
    const socket = socketIOClient('ws://localhost:4000');
    socket.on('mqtt', data => {
      let string = data.payload
      string = string.slice(2,-2)
      this.setState({picture: string})
    }) // this.setState({picture: data.payload})
  }

  onSignIn = (username, password) => {
    for(var i=0; i < this.state.userdb.length; i++){
      if(this.state.userdb[i].name===username &&
        this.state.userdb[i].password===password){
          this.setState({isSignedIn: true,
            user: {name :username}})
            return;
        }
      }

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

  getImage = () => {
    fetch('http://localhost:4000/image')
      .then(response => response.json())
      .then(data => this.setState({picture:data}))
  }

  onLetIn = () => {
    console.log("Letin");
    fetch("http://localhost:4000/open", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: this.state.displayText
      })
    })
  }

  onKeepClose = () => {
    console.log("KeepClose");
    if(this.state.displayText==="Welcome"){
      fetch("http://localhost:3000/close", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "Closed"
      })
    })
    }
    else{
      fetch("http://localhost:4000/close", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: this.state.displayText
      })
    })
    }

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
            <img className="doorImg" src={`data:image/png;base64, ${this.state.picture}`}  alt="who is on the door)"/>
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
              <Button
                className="button"
                color="info"
                onClick={this.getImage}>
                  Get Image
              </Button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
