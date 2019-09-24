import React from 'react';

import axios from 'axios';
import {
  Container, Row, Col, Spinner, Alert
} from 'reactstrap';

import Profile from './components/Profile'
import ReposList from './components/ReposList'


//SET GITHUB API ACCESS TOKEN HERE

//future fix -- must use env file
//const access_token = 'd9c11dbe2bb8198613894d3672b95d875fb81dc0';
//axios.defaults.headers.common['Authorization'] = `Token ${access_token}` 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user : 'rael-lage',
      errorStat: ''
    };
  }

  componentDidMount() {
    const user = this.state.user;
    axios.get(`https://api.github.com/users/${user}`)
      .then(res => {
        const user = res.data;
        this.setState({ user: user.login });
      })
      .catch((error) => this.setState({errorStat: error.response.status}));
  }

  render() {
    const user = this.state.user;

    switch(this.state.errorStat) {
      case 404:
        return <Alert color="danger">User: <b className="alert-link">{user}</b> not found on Github API :(</Alert>
      case 401:
        return <Alert color="danger">Access token invalid to connect Github API :( | Correct access_token in App.js</Alert>
    }

    if (Object.entries(user).length === 0 && user.constructor === Object) {
      return <div className="text-center"><Spinner color="secondary" /></div>;
    } else {
      return (
        <Container fluid>
          <br/>
          <Row>
            <Col xs='12' sm='4' md='5' lg='3' >
              <Profile user={user}/>
            </Col>
            <Col xs='12' sm='8' md='7' lg='9' >
              <ReposList user={user} />
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default App;