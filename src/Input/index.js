import React, {PureComponent, PropTypes} from 'react';
import Text from '../Text/index';

import './index.css';

const components = {Text};

export default class Input extends PureComponent {

    static defaultProps = {
        error: '',
        type: 'text',
        title: '',
        name: '',
    };

    static propTypes = {
        error: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    getInput() {
        const {type, name, errors}    = this.props;
        const classes = errors[name] ? 'errorInput' : '';
        const Input = components[type];
        const {handleChange} = this;
        const {value} = this.state;

        return (
            <Input className={classes} name={name} onChange={handleChange} value={value}/>
        )
    }

    render() {

        const {getInput} = this;
        const {errors, title, name} = this.props;
        // const classes = errors[name] ? 'errorInput' : '';

        return (
            <div className="formField">

                <div>
                    <label>{title} </label>
                    {getInput()}
                </div>

                <span className="errorMessage">{errors[name]}</span>

            </div>
        )
    }
}

