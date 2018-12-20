import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import TabBar from '../components/tabBar';
import TextEntry from '../components/textEntry';
import Table from '../components/table';

import { API_HOST } from '../utils/constants';

const cors = require('cors')({ origin: true });//eslint-disable-line


class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      textfield: '',
      todos: []
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    fetch('https://todolist-91ab2.firebaseio.com/todos.json', {
      method: 'GET'
    })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
       throw new Error('Could not fetch cancellation reasons.');
     })
     .then((data) => {
       console.log(data);
     })
     .catch(error => console.log(error));
  }

  handleTabChange = (event, value) => {
    this.setState({ activeTabIndex: value });
  }

  handleTextfieldChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    });
  }


  handleCreateNewTodo = () => {
    const newTodo = {
      text: this.state.textfield,
      completed: false
    };

    const formdata = new FormData();
    formdata.append('text', this.state.textfield);
    formdata.append('completed', false);

    const todos = [
      ...this.state.todos
    ];
    todos.push(newTodo);
    console.log(todos);
    console.log(newTodo);
    console.log(API_HOST);


    fetch('https://todolist-91ab2.firebaseio.com/todos.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)

    })
     .then((res) => {
       if (res.ok) {
         this.setState({ todos, textfield: '' });
         return res.json();
       }
       throw new Error('Could not fetch cancellation reasons.');
     })
     .catch(error => console.log(error));

    // fetch('https://todolist-91ab2.firebaseio.com/todos.json', {
    //   method: 'GET',
    //   credential: 'include'
    // })
    //  .then(res => console.log(res.json()))
    //  .catch(error => console.log(error));
  }

  render() {
    return (
      <IntlProvider locale="en">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <TabBar selected={this.state.activeTabIndex} handleChange={this.handleTabChange} />
            <TextEntry
              value={this.state.textfield}
              handleChange={this.handleTextfieldChange}
              handleAdd={this.handleCreateNewTodo}
            />
            <Table rows={this.state.todos} />
          </div>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

Index.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

Index.defaultProps = {
  user: null
};

module.exports = Index;
