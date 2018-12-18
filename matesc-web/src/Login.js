import React, { Component } from 'react';
import {
    Container,
    Button,
    Col, Form,
    FormGroup,
    Alert,
} from 'reactstrap';
import Cookies from 'universal-cookie';
import { authenticate} from './utils';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            error: false
        }

        this.validateInput = this.validateInput.bind(this);
    }

    showLoadingOrButton(){
        if(this.state.loading)
            return <div className="loader">Loading...</div>
        else
            return <Button>Submit</Button>
    }

    loginSuccess(){
        window.location.href = '/unprocessed-client-orders';
    }

   async validateInput(event){
        event.preventDefault();
        this.setState({
            loading:true
        })
        let response = await authenticate(this.username.value, this.password.value);
        this.setState({
            loading:false
        })
        if(response.status === 200){
            let token = await response.json();
            const cookies = new Cookies();
            cookies.set('token', token, { path: '/' , maxAge: token.expires_in});
            this.loginSuccess();
        }else{
            this.setState({
                error:true
            }) 
        }       
        
    }

    showWrongCredencials(){
        if(this.state.error)
            return <Alert color="danger"> Username/Password Errada</Alert>
    }

    render() {
        return (<Container className="Login">
            {this.showWrongCredencials()}
            <h2>Log In</h2>
            <Form className="form" onSubmit={this.validateInput}>
                <Col>
                    <FormGroup>
                        <input className="form-control" 
                            ref={(username) => this.username = username} 
                            type="text"
                            id="username"
                            placeholder="Username"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <input className="form-control" 
                            ref={(password) => this.password = password} 
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                    </FormGroup>
                </Col>
                {this.showLoadingOrButton()}
            </Form>
        </Container>
        );
    }
}