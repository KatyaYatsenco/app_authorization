import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './index.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        localStorage.removeItem("user");
        this.setState({
            redirect: true
        })
    }

    render() {
        const {handleClick}=this;
        const {redirect} = this.state;

        if (redirect || !localStorage.user) {
            return (
                <Redirect to="/login"/>
            )
        }

        return (<div className="personalDreamPage">
                <h1 className="dreamListTitle">Welcome {localStorage.user}!</h1>
                {/*<h2 className="dreamListTitle">It's your personal dream list.</h2>*/}
                <input type="button" onClick={handleClick} value="Logout"/>
            </div>
        )

    }
}
