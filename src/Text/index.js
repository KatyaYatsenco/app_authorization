import React, {PureComponent} from 'react';
/*
 import './styles.scss';
 */

export default class Text extends PureComponent {

    render() {

        const {name, value, onChange} = this.props;

        return (
            <input name={name} type="text" value={value} onChange={onChange}/>
        )
    }
}

