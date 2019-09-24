import React from 'react';
import {
  ListGroup, ListGroupItem, InputGroup, Input, Spinner
} from 'reactstrap';

import axios from 'axios';

class CommitsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      commits: [],
      filtered: []
    };
  }

  verifyInitialFilter() {
    if (this.state.filtered.length === 0) {
      const commits = this.state.commits;
      this.setState({
        filtered: commits
      });
    }
  }

  componentDidMount() {
    const user = this.props.user;
    const repo = this.props.repo;
    axios.get(`https://api.github.com/repos/${user}/${repo}/commits?per_page=20`)
      .then(res => {
        const commits = res.data;
        this.setState( { commits: commits.map(item => item.commit.message) } );
        this.verifyInitialFilter();
      })
  }

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
        // Variable to hold the filtered list before putting into state
    let newList = [];

        // If the search bar isn't empty
    if (e.target.value !== "") {
            // Assign the original list to currentList
      //currentList = this.state.commits.map(a => a.commit.message);
      currentList = this.state.commits;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
      newList = currentList.filter(item => {
                // change current item to lowercase
        const lc = item.toLowerCase();
                // change search term to lowercase
        const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.state.commits;
    }
        // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }
  
  render() { 
    if (this.state.commits.length === 0) {
      return <div className="text-center"><Spinner color="secondary" /></div>;
    } else {
      return (
        <div>
          <InputGroup size="lg">
            <Input onChange={this.handleChange} placeholder="Search..." />
          </InputGroup>
          <br/>
          <ListGroup style = {{    
            maxHeight: 'calc(100vh - 50px)',
            marginBbottom: '10px',
            overflow: 'scroll',
            WebkitOverflowScrolling: 'touch'}}>    
            { this.state.filtered.map((commit, i) => 
              <ListGroupItem key={i}>{commit}</ListGroupItem>        
            )}
          </ListGroup>
        </div>
      )
    }    
    
  }
}

export default CommitsList;