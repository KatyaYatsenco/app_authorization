import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Form from '../Form/index';
import Input from '../Input/index';

function validate(formData) {
    const errors = {};
    if(formData.name === 0) {
        errors.name = 'Please enter your name!'
    }
    if (formData.email.indexOf('@') === -1) {
        errors.email = " It's not email, please correct it!"
    }
    if (formData.password.length < 5) {
        errors.password = 'Password is so short!'
    }
    if (formData.password1.length < 5) {
        errors.password1 = 'Password is so short!'
    }
    if (formData.password !== formData.password1) {
        errors.password1 = 'Passwords do not match!'
    }
    return errors;
}


export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            redirect: false
        }
    }

    handleSubmit(event) {
        let users = {};
        try {
            users = JSON.parse(localStorage.getItem("users")) || {};
        }
        catch (error) {
            console.log(error);
        }
        users[event.email] = event;
        localStorage.setItem("users", JSON.stringify(users));
        console.log(event)
        this.setState({
            redirect: true
        })

    }

    render() {

        const {handleSubmit} = this;
        const {redirect} = this.state;

        if (redirect) {
            return (

                <Redirect to="/login"/>
            )
        }

        return (
            <div className="formData">
                <h2 className="formTitle">Registration</h2>

                <Form validate={validate} onSubmit={handleSubmit}>
                    <Input type="Text" name='name' title="Name"></Input>

                    <Input type="Text" name='email' title="Email"></Input>
                    <Input type="Text" name='password' title="Password"></Input>
                    <Input type="Text" name='password1' title="Password"></Input>

                </Form>

                <p className="hint">
                    Already have an account?
                    <Link to='/'>Log in</Link>
                </p>
            </div>
        )
    }
}
