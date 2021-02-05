import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, List, Grid, Placeholder, Segment, Button } from 'semantic-ui-react';
import history from '../services/history';

class DashboardComponent extends Component {

    getLinePlaceholder = () => {
        return (
            <Placeholder>
                <Placeholder.Header>
                    <Placeholder.Line length="short" />
                </Placeholder.Header>
            </Placeholder>
        );
    }

    getParagraphPlaceholder = (length="full") => {
        return (
            <Placeholder fluid>
                <Placeholder.Header>
                    <Placeholder.Line length={length} />
                    <Placeholder.Line length={length} />
                    <Placeholder.Line length={length} />
                    <Placeholder.Line length={length} />
                </Placeholder.Header>
            </Placeholder>
        )
    }

    getSegmentPlaceholder = (length="full") => {
        return (
            <Segment basic>
                <Placeholder fluid>
                    <Placeholder.Header>
                        <Placeholder.Line length={length} />                    
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length={length} />
                        <Placeholder.Line length={length} />
                        <Placeholder.Line length={length} />
                    </Placeholder.Paragraph>
                    
                </Placeholder>
                <Placeholder fluid>
                    <Placeholder.Header>
                        <Placeholder.Line length={length} />                    
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length={length} />
                        <Placeholder.Line length={length} />
                        <Placeholder.Line length={length} />
                    </Placeholder.Paragraph>
                    
                </Placeholder>
            </Segment>
        );
    }

    renderWorkExperience = (experiences = []) => {
        if(!experiences.length) {
            return this.getSegmentPlaceholder();
        }
        return experiences.map(experience => {
            return (
                <Segment padded key={experience.companyName}>
                    <Header as="h4">
                        {experience.companyName}
                    </Header>
                    <Header as="h5">
                        {experience.designation}
                    </Header>
                    <p>
                        {experience.roleAndResponsibility}
                    </p>
                </Segment>
            )
        })

    }

    renderListItems = (list = []) => {
        if(!list.length) {
            return this.getParagraphPlaceholder('medium');
        }
        return list.map(item => {
            return (
                <List.Item key={item}>{item}</List.Item>
            );
        })
    }

    render() {
        return (
            <div>
                <Segment basic>
                    <Button
                        type="button"
                        className="teal"
                        onClick = {() => history.push('/update-resume')}
                    >
                        <Icon name='edit' />
                        Edit
                    </Button>
                </Segment>
                <div id="resume-content">
                    <Header as='h2' icon textAlign='center'>
                    <Icon name='users' circular />
                    <Header.Content>
                        {`${this.props.resume.firstName} ${this.props.resume.lastName}`}
                    </Header.Content>
                </Header>
                    <Grid divided="vertically">
                    <Grid.Row columns="2">
                        <Grid.Column>
                            <List >
                                <List.Item>
                                    <List.Icon name='mail' />
                                    <List.Content>
                                        <a href={`mailto:${this.props.resume.email}`}>{this.props.resume.email}</a>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='phone volume' />
                                    <List.Content>{this.props.resume.contact}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='marker' />
                                    <List.Content>{this.props.resume.currentAddress || this.getLinePlaceholder()}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='linkify' />
                                    <List.Content>
                                        {this.props.resume.currentOrganization || this.getLinePlaceholder()}
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Header as='h3' dividing>
                                About Me
                            </Header>
                            <div>
                                {this.props.resume.aboutMe || this.getParagraphPlaceholder()}
                            </div>
                            <Header as='h3' dividing>
                                Technical Skill
                            </Header>
                            <List bulleted={!!this.props.resume.technicalSkills}>
                                {this.renderListItems(this.props.resume.technicalSkills)}
                            </List> 
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3' dividing>
                                Work Experience
                            </Header>
                            <List>
                                {this.renderWorkExperience(this.props.resume.workExperience)}
                            </List> 
                            <Header as='h3' dividing>
                                Education
                            </Header>
                            <List>
                                {this.renderWorkExperience(this.props.resume.education)}
                            </List> 
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
                <div id="editor"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        resume: state.resume
    };
}

export default connect(mapStateToProps)(DashboardComponent);