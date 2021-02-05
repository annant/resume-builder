import React, { Component } from 'react';
import { Form, Button, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ValidationMessages, Email_Regex } from '../constants';
import { login } from '../services';
import history from '../services/history';
import { connect } from 'react-redux';
import { loginUser, updateResume } from '../actions';


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authForm: {userName: '', password: ''},
            errors: {userName: ValidationMessages.requiredField, password: ValidationMessages.requiredField},
            dirty: false,
            submitting: false,
            isFormValid: false,
            submitted: false
        };
    }

    handleFormValueChange = (event) => {
        const {name, value} = event.target;
        const formValue = this.state.authForm;
        formValue[name] = value;
        this.setState({authForm: formValue, dirty: true});
        this.validateFormValues(event);
    }

    validateFormValues = () => {
        const errors = {
        };
        for(const key in this.state.authForm) {
            if(!this.state.authForm[key]) {
                errors[key] = ValidationMessages.requiredField;
            } else if(key === 'userName' && !Email_Regex.test(this.state.authForm.userName)) {
                errors[key] = ValidationMessages.invalidUserName;
            }
        }
        this.setState({errors, isFormValid: !errors.password && !errors.userName});
    } 

    getValidationMessage = (name) => {
        if(!this.state.submitted || !this.state.errors[name]) {
            return;
        }
        return (
            <Message
                error
                content={this.state.errors[name]}
            />
        );
    }

    verifyCredential = async (event) => {
        event.preventDefault();
        if(this.state.isFormValid) {
            this.setState({submitting: true});
            try {
                const response = await login(this.state.authForm);
                this.setState({submitting: false});
                if(response && response.status===200) {
                    sessionStorage.setItem('SESSION_DATA', JSON.stringify(response.sessionData));
                    this.props.loginUser(response.sessionData);
                    this.props.updateResume(response.sessionData);
                    history.push('/dashboard');
                    return;
                }
            } catch(e) {
                this.setState({submitting: false});
                alert(e.error);
            }
        }
    }


    render() {
        return (
            <Grid verticalAlign='middle' columns={2} centered>
                <Grid.Column>
                    <h2 className="ui teal image header">
                        <div className="content center">
                            Log In To Your Account
                        </div>
                    </h2>
                    <Form onSubmit={this.verifyCredential} error={!this.state.isFormValid}>
                        <Segment stacked>
                            <Form.Input
                                type="text"
                                label="Username"
                                name="userName"
                                placeholder="Enter username"
                                value = {this.state.authForm.userName}
                                autoComplete="off"
                                onChange= {this.handleFormValueChange}>                            
                            </Form.Input>
                            {this.getValidationMessage('userName')}
                            <Form.Input
                                type="password"
                                label="Password"
                                name="password"
                                placeholder="Enter password"
                                value = {this.state.authForm.password}
                                onChange= {this.handleFormValueChange}>
                            </Form.Input>
                            {this.getValidationMessage('password')}
                            <Button
                                type='submit'
                                fluid
                                className="teal"
                                disabled={!this.state.dirty || this.state.submitting}>Submit</Button>
                        </Segment>                        
                    </Form>
                    <Message>
                        Don't have an account? <Link to="/register">Sign Up</Link>
                        {this.state.isFormValid.toString()}
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sessionData: state.authData
    };
}

export default connect(mapStateToProps, {loginUser, updateResume})(LoginComponent);