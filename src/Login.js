import React, {PureComponent} from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'


const Validate = ({name, password}) => {
    const errors = {};
    if (name.length < 3) {
        errors.name = 'Name is so short'
    }
    if (password.length < 5) {
        errors.password = 'Password is so short'
    }
    return errors;
};

const Auth = ({name, password}) => {
    return (name === 'admin' && password === 'admin')

};

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };
    }

    handleSubmit = (event) => {
        const {name:{value:name}, password:{value:password}} = this;
        const errors = Validate({name, password});
        if (Object.keys(errors).length === 0) {
            if (Auth({name, password})) {
                this.setState({userLogined: true})
            }
            else {
                this.setState({errors: {server: 'User not found'}})
            }
        }
        else {
            this.setState({errors});
        }
        event.preventDefault();

    };

    render() {
        const {errors, userLogined} = this.state;
        if (userLogined) {
            return (
                <Redirect to='/home'/>
            )
        }
        return (
            <div>
                <h1>Please type your data for login</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    <div>
                        <input ref={(input) => (this.name = input)} type="text" placeholder="Name"/>
                        {errors.name ? <span>{errors.name}</span> : null}
                    </div>
                    <div>
                        <input ref={(input) => (this.password = input)} type="text" placeholder="Password"/>
                        {errors.password ? <span>{errors.password}</span> : null}
                    </div>
                    {errors.server ? <span>{errors.server}</span> : null}
                    <input type="submit" value="Sign in"/>
                </form>
                <Link to='/registration'>If you are not registered, click on</Link>
            </div>
        )
    }
}


export default Login
