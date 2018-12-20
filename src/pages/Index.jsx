import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import TabBar from '../components/tabBar';
import TextEntry from '../components/textEntry';
import Row from '../components/row';


const cors = require('cors')({ origin: true });//eslint-disable-line


class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      textfield: '',
      todos: {}
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
       throw new Error('Could not fetch todos.');
     })
     .then((data) => {
       this.setState({ todos: data === null ? {} : data });
     })
     .catch(error => console.log(error));
  }

  setupTodoRows = () => {
    const { todos } = this.state;

    const todoArr = Object.keys(todos).map((id) => {
      const todo = todos[id];
      return {
        id,
        text: todo.text,
        completed: todo.completed
      };
    });

    let filteredTodos;

    switch (this.state.activeTabIndex) {
      case 0:
        filteredTodos = todoArr;
        break;
      case 1:
        filteredTodos = todoArr.filter(todo => todo.completed === false);
        break;
      case 2:
        filteredTodos = todoArr.filter(todo => todo.completed === true);
        break;
      default:
        return '';
    }

    return filteredTodos.map(todo => (
      <Row
        key={todo.id}
        id={todo.id}
        title={todo.text}
        completed={todo.completed}
        handleChecked={this.handleUpdateTodoChecked}
        handleDeleted={this.handleDeleteTodo}
      />
    ));
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

    const todos = {
      ...this.state.todos
    };

    fetch('https://todolist-91ab2.firebaseio.com/todos.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
       throw new Error('Could not create a new todo.');
     })
     .then((data) => {
       const todo = {
         text: this.state.textfield,
         completed: false
       };
       todos[data.name] = todo;
       this.setState({ todos, textfield: '' });
     })
     .catch(error => console.log(error));
  }

  handleUpdateTodoChecked = id => () => {
    const todos = {
      ...this.state.todos
    };

    todos[id].completed = !todos[id].completed;

    const updatedTodo = {
      completed: todos[id].completed
    };

    fetch(`https://todolist-91ab2.firebaseio.com/todos/${id}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
       throw new Error('Sorry, could not mark todo as completed.');
     })
     .then(() => this.setState({ todos }))
     .catch(error => console.log(error));
  }

  handleDeleteTodo = (id) => {
    const todos = {
      ...this.state.todos
    };

    delete todos[id];

    fetch(`https://todolist-91ab2.firebaseio.com/todos/${id}.json`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
       throw new Error('Could not delete todo.');
     })
     .then(() => this.setState({ todos }))
     .catch(error => console.log(error));
  }

  handleDeleteAllCompleted = () => {
    const todos = {
      ...this.state.todos
    };

    const idArr = Object.keys(this.state.todos).filter(id => todos[id].completed === true);

    for (let i = 0; i < idArr.length; i += 1) {
      fetch(`https://todolist-91ab2.firebaseio.com/todos/${idArr[i]}.json`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
       .then((res) => {
         if (res.ok) {
           return res.json();
         }
         throw new Error('Could not delete todo.');
       })
       .then(() => {
         delete todos[idArr[i]];
         this.setState({ todos });
       })
       .catch(error => console.log(error));
    }
  }


  render() {
    const todos = this.setupTodoRows();
    return (
      <IntlProvider locale="en">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className="top-right-action">
            <Button
              variant="outlined"
              size="small"
              color="default"
              onClick={this.handleDeleteAllCompleted}
            >
              Delete Completed
              <DeleteIcon />
            </Button>
          </div>
          <div className="content-container">
            <TabBar selected={this.state.activeTabIndex} handleChange={this.handleTabChange} />
            <TextEntry
              value={this.state.textfield}
              handleChange={this.handleTextfieldChange}
              handleAdd={this.handleCreateNewTodo}
            />
            {todos}
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
