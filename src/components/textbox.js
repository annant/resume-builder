import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class TextboxComponent extends Component {
    render() {
        return (
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' />
            </Form.Field>
        );
    }
}

export default TextboxComponent;