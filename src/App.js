import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Signin from './components/signin/signin';
import { Button, FormGroup, Label, Input } from 'reactstrap';
var base64ToImage = require('base64-to-image');

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
      displayText: "Welcome",
      userdb:[
        { name: "Admin", password: "Admin"},
        { name: "Trygve", password: "Trygve"},
        { name: "Håkon", password: "Håkon"},
        { name: "Mathani", password: "Mathani"},
        { name: "Hanne", password: "Hanne"},
        { name: "Sigmund", password: "Sigmund"}
      ],
      picture: "",
      pictureID:""
    }
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

  onLetIn = () => {
    console.log("Letin");
    fetch("http://localhost:3000/open", {
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
    fetch("http://localhost:3000/close", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: this.state.displayText
      }) 
    })
  }

  //DO we need this method??
  /*
  postToServer = (letIn) => {
    // TODO: find correct IP address
    fetch("129.241.209.231", {
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
*/

  

  putTogetherBase64 = (part) => {
    var partSplit = JSON.parse(part)
    var newData = this.state.picture + partSplit.data;
    if(this.state.pictureID===""){
      this.setState({pictureID: partSplit.pic_id,
                    picture: newData})
    } 
    else if(this.state.pictureID===partSplit.pic_id){
      this.setState({pictureID: partSplit.pic_id,
                    picture: newData})
    } 
    else {
      this.setState({pictureID: partSplit.pic_id,
                      picture: partSplit.data})
    }
  }

  convertToImage = () => {
    var base64Str =`iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==`
    var path = 'C:/Users/Google DriveSkole/NTNU/4. semester/Design av kommuniserende systemer/T3/App/app_frontend/src/'
    var optionalObj = {'fileName': 'picture', 'type':'png'};
    base64ToImage(base64Str,path,optionalObj); 
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
