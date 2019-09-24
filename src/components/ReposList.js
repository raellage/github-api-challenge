import React from 'react';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Spinner
} from 'reactstrap';

import CommitsList from './CommitsList'

import axios from 'axios';

class ReposList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalRepo: '',
      repos: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {      
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  renderCommits(repo) {
    this.setState({ modalRepo: repo });
    this.toggle();
  }

  componentDidMount() {
    const user = this.props.user;
    axios.get(`https://api.github.com/users/${user}/repos`)
      .then(res => {
        const repos = res.data;
        this.setState({ repos });
      })
  }

  render() {
    const repos = this.state.repos;
    if (repos.length === 0) {
      return <div className="text-center"><Spinner color="secondary" /></div>;
    } else {
      return (
        <div>
          <ListGroup style = {{    
            maxHeight: 'calc(100vh - 50px)',
            marginBbottom: '10px',
            overflow: 'scroll',
            WebkitOverflowScrolling: 'touch'}}>

            { repos.map(repo => 
              <ListGroupItem key={repo.id}>
                <ListGroupItemHeading>
                  {repo.name} - ★ <Badge pill>{repo.stargazers_count}</Badge>
                  {' '}
                  <div className="text-right">
                    <Button color="secondary" size="sm" onClick={() => this.renderCommits(repo.name)}> View Commits</Button>
                  </div>
                </ListGroupItemHeading>
                <ListGroupItemText>
                {repo.description}
                </ListGroupItemText>
              </ListGroupItem>        
            )}
          </ListGroup>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size='lg'>
            <ModalHeader toggle={this.toggle}>Commits - {this.state.modalRepo} </ModalHeader>
            <ModalBody>
              <CommitsList user={this.props.user} repo={this.state.modalRepo} ></CommitsList>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }
  }
}

export default ReposList;