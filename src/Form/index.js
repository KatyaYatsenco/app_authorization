import React, {PureComponent, PropTypes} from 'react';

/*import './styles.scss';*/

export default class Form extends PureComponent {

    static defaultProps = {
        onChange: Function.prototype,
        onSubmit: Function.prototype
    };

    static propTypes = {
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

    }

    handleSubmit(event) {

        const {validate, onSubmit} = this.props;
        event.preventDefault();
        const {elements} = this.form;
        const formData = {};
        // const errors = this.state;

        for (let i = 0; i < elements.length; i++) {
            const input = elements[i];
            if (input.name) {
                formData[input.name] = input.value;
            }
        }
        const errors = validate(formData);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            onSubmit(formData)
        }
    }

    render() {

        const {handleSubmit, handleChange} = this;
        const {children} = this.props;
        const {errors} = this.state;


        return (
            <div className="form">
                <form onSubmit={handleSubmit} onChange={handleChange} ref={form => this.form = form}>

                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {errors})
                    })}

                    <input className="submitButton" type='submit'/>
                </form>
            </div>
        )
    }
}

