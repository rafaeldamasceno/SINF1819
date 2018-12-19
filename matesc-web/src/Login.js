import React, { Component } from 'react';
import {
    Container,
    Button,
    Col, Form,
    FormGroup,
    Alert,
} from 'reactstrap';
import Cookies from 'universal-cookie';
import { authenticate } from './utils';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false
        }

        this.validateInput = this.validateInput.bind(this);
    }

    showLoadingOrButton() {
        if (this.state.loading)
            return <div className="loader">Loading...</div>
        else
            return <button className="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit">Login</button>
    }

    loginSuccess() {
        window.location.href = '/unprocessed-client-orders';
    }

    async validateInput(event) {
        event.preventDefault();
        this.setState({
            loading: true
        })
        let response = await authenticate(this.username.value, this.password.value);
        this.setState({
            loading: false
        })
        if (response.status === 200) {
            let token = await response.json();
            const cookies = new Cookies();
            cookies.set('token', token, { path: '/', maxAge: token.expires_in });
            this.loginSuccess();
        } else {
            this.setState({
                error: true
            })
        }

    }

    showWrongCredencials() {
        if (this.state.error)
            return <Alert color="danger">Wrong Username/Password</Alert>
    }

    render() {
        return (<Container className="Login">
            <div className="wrapper">
                <Form className="form-signin" onSubmit={this.validateInput}>
                    <h3 className="form-signin-heading">Welcome Back! Please Sign In</h3>
                    <hr className="colorgraph"></hr>

                    <input className="form-control"
                        ref={(username) => this.username = username}
                        type="text"
                        id="username"
                        placeholder="Username"
                    />
                    <input className="form-control"
                        ref={(password) => this.password = password}
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
    	            {this.showWrongCredencials()}
                    {this.showLoadingOrButton()}
                </Form>
            </div>
        </Container>
        )
    }
}