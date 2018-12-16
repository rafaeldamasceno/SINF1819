import React, { Component } from 'react';
import {
    Container,
    Button,
    Col, Form,
    FormGroup,
} from 'reactstrap';
import Cookies from 'universal-cookie';
import { authenticate } from './utils';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.validateInput = this.validateInput.bind(this);
    }

   async validateInput(event){
        event.preventDefault();
        let response = await authenticate(this.username.value, this.password.value);
        if(response.status === 200){
            console.log("login sucessfull");
            
            let token = await response.json();
            console.log(token);
            
            const cookies = new Cookies();
            cookies.set('token', token, { path: '/' }); 
            
        }else{
            console.log("bad login info");
            
        }
        
        
    }

    render() {
        return (<Container className="Login">
            <h2>Log In</h2>
            <Form className="form" onSubmit={this.validateInput}>
                <Col>
                    <FormGroup>
                        <input class="form-control" 
                            ref={(username) => this.username = username} 
                            type="text"
                            id="username"
                            placeholder="Username"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <input class="form-control" 
                            ref={(password) => this.password = password} 
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                    </FormGroup>
                </Col>
                <Button>Submit</Button>
            </Form>
        </Container>
        );
    }
}