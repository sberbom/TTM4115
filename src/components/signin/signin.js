import React from 'react';
import { InputGroup, InputGroupAddon, Input, ButtonGroup } from 'reactstrap';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:{},
            password:{}
        }
    }
    
    submit = () => {
        this.props.onSignIn(this.state.userName, this.state.password);
    }

    onUsernameChange = (event) => {
        this.setState({userName: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render(){
        return(
            <div>
                <h3>Sign in</h3>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input onChange={this.onUsernameChange} placeholder="username" />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">**</InputGroupAddon>
                    <Input type="password" onChange={this.onPasswordChange} placeholder="password" />
                </InputGroup>
                <ButtonGroup>
                    <button color="primary" onClick={() => this.submit()}>
                        Sign in
                    </button>
                </ButtonGroup>
            </div>
        );
    }
    
}

export default Signin;