import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Form from '../Form/index';
import Input from '../Input/index';

function validate(formData) {
    const errors = {};

    if (formData.email.length === 0) {
        errors.email = 'Empty email'
    }
    if (formData.password.length < 5) {
        errors.password = 'Password is so short'
    }
    let users = {};
    try {
        users = JSON.parse(localStorage.getItem("users"));
    }
    catch (error) {
        console.log(error);
    }
    if (users[formData.email]) {
        const user = users[formData.email];
        if (user.password !== formData.password) {
            errors.password = "Wrong password"
        }
    }
    else {
        errors.email = "Please registrate"
    }

    return errors;
}


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            redirect: false
        }
    }

    handleSubmit(event) {

        const email = event.email;

        const name = JSON.parse(localStorage.getItem("users"))[email].name;

        localStorage.setItem("user", name);

        this.setState({
            redirect: true
        });
    }

    render() {
        const {handleSubmit} = this;
        const {redirect} = this.state;
        if (redirect) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="formData">
                <h2 className="formTitle">Login</h2>

                <Form validate={validate} onSubmit={handleSubmit}>
                    <Input type="Text" name='email' title="Email"></Input>
                    <Input type="Text" name='password' title="Password"></Input>

                </Form>
                <p className="hint">
                    No account yet?
                    <Link to='/registration'> Registration</Link>
                </p>
            </div>
        )

    }
}
