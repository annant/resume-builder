import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Segment, Form, label, Grid, Header, List, Button, Icon, Label } from 'semantic-ui-react';
import history from '../services/history';
import { updateResume } from '../actions';

class UpdateResumeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({
            email: this.props.resume.userName,
            technicalSkills: [],
            workExperience: [],
            currentOrganization: '',
            currentAddress: '',
            aboutMe: ''
        }, {...this.props.resume});
    }

    renderTecnicalSkillInputs = () => {
        if(!this.state.technicalSkills || !this.state.technicalSkills.length) {
            return;
        }
        return this.state.technicalSkills.map((skill, index) => {
            return (
                <Form.Input
                    key={index}
                    type="text"
                    value={skill}
                    name={`skill${index}`}
                    placeholder="Java, Python, Javascript etc"
                    icon={<Icon name='trash alternate outline' circular link onClick={() => {
                        const skills = this.state.technicalSkills;
                        skills.splice(index, 1);
                        this.setState({technicalSkills: skills});
                    }} />}
                    onChange={(e) => {
                            const skills = this.state.technicalSkills;
                            skills[index] = e.target.value;
                            this.setState({technicalSkills: skills});
                        }
                    } 
                />
            )
        });
    }

    addNewSkill = () => {
        const skills = this.state.technicalSkills || [];
        skills.push('');
        this.setState({technicalSkills: skills});
    }

    addWorkExperience = () => {
        const experience = this.state.workExperience || [];
        experience.push({companyName: '', designation: '', roleAndResponsibility: ''});
        this.setState({workExperience: experience});
    }

    renderWorkExperience = () => {
        if(!this.state.workExperience || !this.state.workExperience.length) {
            return;
        }
        return this.state.workExperience.map((experience, index) => {
            return (
                <Segment padded key={index}>
                    <Form.Field>
                        <label>Company Name</label>
                        <Form.Input
                            type="text"
                            value={this.state.workExperience[index].companyName}
                            name={`companyName${index}`}
                            placeholder="Enter Company Name"
                            onChange={(e) => {                                    
                                    const experiences = this.state.workExperience;
                                    experiences[index].companyName = e.target.value;
                                    this.setState({workExperience: experiences})
                                }
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Designation</label>
                        <Form.Input
                            type="text"
                            value={this.state.workExperience[index].designation}
                            name={`designation${index}`}
                            placeholder="Enter Designation"
                            onChange={(e) => {
                                    const experiences = this.state.workExperience;
                                    experiences[index].designation = e.target.value;
                                    this.setState({workExperience: experiences})
                                }
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Roles and Responsibility</label>
                        <Form.Input
                            type="text"
                            value={this.state.workExperience[index].roleAndResponsibility}
                            name={`roleAndResponsibility${index}`}
                            placeholder="Enter Roles & Responsibility"
                            onChange={(e) => {
                                    const experiences = this.state.workExperience;
                                    experiences[index].roleAndResponsibility = e.target.value;
                                    this.setState({workExperience: experiences})
                                }
                            }
                        />
                    </Form.Field>
                    <Label attached='top right' icon="trash alternate outline" basic onClick={() => {
                            const workExperience = this.state.workExperience;
                            workExperience.splice(index, 1);
                            this.setState({workExperience});
                        }}
                    >

                    </Label>
                </Segment>
            )
        });
    }

    saveResume = (e) => {
        e.preventDefault();
        this.props.updateResume({...this.state});
        history.push('/dashboard');
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.saveResume}>
                    <Header as="h2" textAlign="center" className="teal margin-bottom-40" dividing>Update Resume</Header>
                    <Segment>
                        <Grid divided="vertically">
                            <Grid.Row columns="2">
                                <Grid.Column>
                                    <Header as='h3' dividing>
                                        Personal Details
                                    </Header>
                                    <Segment padded>
                                        <Form.Field>
                                            <label>First Name</label>
                                            <Form.Input
                                                type="text"
                                                value={this.state.firstName}
                                                name="firstName"
                                                placeholder="Enter First Name"
                                                onChange={(e) => this.setState({firstName: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Last Name</label>
                                            <Form.Input
                                                type="text"
                                                value={this.state.lastName}
                                                name="lastName"
                                                placeholder="Enter Last Name"
                                                onChange={(e) => this.setState({lastName: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Email</label>
                                            <Form.Input
                                                type="text"
                                                value={this.state.email}
                                                name="email"
                                                placeholder="Enter Email Id"
                                                onChange={(e) => this.setState({email: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Contact</label>
                                            <Form.Input
                                                type="text"
                                                value={this.state.contact}
                                                name="contact"
                                                placeholder="Enter Contact No."
                                                onChange={(e) => this.setState({contact: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Current Organisation</label>
                                            <Form.Input
                                                type="text"
                                                value={this.state.currentOrganization}
                                                name="currentOrganization"
                                                placeholder="Enter Current Organisation Name"
                                                onChange={(e) => this.setState({currentOrganization: e.target.value})}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Current Address</label>
                                            <Form.Input
                                                type="text"
                                                value={this.state.currentAddress}
                                                name="currentAddress"
                                                placeholder="Enter Current Address"
                                                maxLength="40"
                                                onChange={(e) => this.setState({currentAddress: e.target.value})}
                                            />
                                        </Form.Field>
                                    </Segment>
                                    <Header as='h3' dividing>
                                        About Me
                                    </Header>
                                    <Form.TextArea
                                        rows="5"
                                        placeholder="Write about your self"
                                        value= {this.state.aboutMe}
                                        onChange={(e) => this.setState({aboutMe: e.target.value})}
                                    />
                                    <Header as='h3' dividing>
                                        Technical Skill
                                    </Header>
                                    <Segment padded>
                                        {this.renderTecnicalSkillInputs()}
                                        <Button type="button" onClick={this.addNewSkill}>Add Skill</Button>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h3' dividing>
                                        Work Experience
                                    </Header>
                                    {this.renderWorkExperience()}
                                    <Segment basic>
                                        <Button type="button" onClick={this.addWorkExperience}>Add Experience</Button>
                                    </Segment>
                                    <Header as='h3' dividing>
                                        Education
                                    </Header>
                                    <List>
                                    
                                    </List> 
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Button type="submit" className="teal">Update</Button>
                </Form>
            </div>
        );
    }

}

const mapStateToProps = ({resume}) => {
    return {resume}
}
export default connect(mapStateToProps, {updateResume})(UpdateResumeComponent);