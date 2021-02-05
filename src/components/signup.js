import React, { Component } from 'react';
import { Form, Button, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export class SignupComponent extends Component {
    render() {
        return (
            <Grid verticalAlign='middle' columns={2} centered>
                <Grid.Column>
                    <h2 class="ui teal image header">
                        <div class="content center">
                            Register Your Account
                        </div>
                    </h2>
                    <Form>
                        <Segment stacked>
                            <Form.Input label="First Name" type="text" placeholder="Enter First Name">
                            </Form.Input>
                            <Form.Input label="Last Name" type="text" placeholder="Enter Last Name">
                            </Form.Input>
                            <Form.Input label="Email" type="text" placeholder="Enter Email Id">
                            </Form.Input>
                            <Form.Input label="Password" type="password" placeholder="Enter Password">
                            </Form.Input>
                            <Button type='submit' fluid className="teal">Submit</Button>
                        </Segment>
                        
                    </Form>
                    <Message>
                        Already have an account? <Link to="/">Log In</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}