import React, { Component } from 'react'

import List from '../components/List.jsx'
import Input from '../components/Input.jsx'
import Title from '../components/Title.jsx'
import Submit from '../components/Submit.jsx'

class ToDo extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    todos: [],
  }

  populateTodos() {
    const {tasks} = this.state;
    const {todos} = this.state;

    var task_list = []

    for (var i = 0; i < tasks.length; i++) {
      task_list.push(tasks[i].name);
    }
    this.setState({todos: [...task_list, ...todos]});
  }

  componentDidMount(){
    fetch('/showTodos', {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
      .then((response) => { return response.json(); })
      .then((json) => { console.log(json); this.setState(json); this.populateTodos();});
  }

  onAddTodo = (text) => {
    const {todos} = this.state

    const data = {
      userId: this.props.user.Id,
      text: text,
    }

    console.log(JSON.stringify(data));

    fetch('/addTodo', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then((response) => { return response.json(); })
      .then((json) => { 
        this.setState({
          todos: [text, ...todos],
        })
      });
  }

  onRemoveTodo = (index) => {
    const {todos} = this.state

    var deletedItem = todos[index];

    console.log(JSON.stringify({deletedItem}))

    fetch('/deleteTodo', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({deletedItem})
    })
      .then((response) => { return response.json(); })
      .then((json) => { 
        this.setState({
          todos: todos.filter((todo, i) => i !== index),
        })
      });
  }

  handleClick = () => {
    const { onSubmitToCal } = this.props;
    const {todos} = this.state;
    console.log("handling click");
    console.log(todos)
    onSubmitToCal(todos);
  }

  render() {
    const {todos} = this.state

    return (
      <div style={styles.container}>
        <h1 id="todo-title">
          To-Do List
        </h1>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <List
          list={todos}
          onClickItem={this.onRemoveTodo}
        />
        <button onClick={this.handleClick}>
          Add to Calendar
        </button>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
}

export default ToDo;