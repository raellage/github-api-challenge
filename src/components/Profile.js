import React from "react";
import {
  Card, CardImg, CardHeader, Button, Badge, Spinner
} from 'reactstrap';
import axios from 'axios';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const user = this.props.user;
    axios.get(`https://api.github.com/users/${user}`)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
  }

  render () {
    const user = this.state.user;
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      return <div className="text-center"><Spinner color="secondary" /></div>;
    } else {
      return (
        <div>
          <Card className="text-center" outline color="secondary">
            <CardHeader>{user.name}</CardHeader>
            <CardImg src={user.avatar_url} alt="User avatar" />
            <br />
            <Button href={user.html_url} target="_blank">{user.login}</Button>             
            <br />    
            <Button color="primary" outline>
              Public Repos <Badge color="secondary">{user.public_repos}</Badge>
            </Button>
            <Button color="primary" outline>
              Followers <Badge color="secondary">{user.followers}</Badge>
            </Button>
            <Button color="primary" outline>
              Following <Badge color="secondary">{user.following}</Badge>
            </Button>
          </Card>
          <br />
        </div>
      )
    }
  }
  
};

export default Profile;
