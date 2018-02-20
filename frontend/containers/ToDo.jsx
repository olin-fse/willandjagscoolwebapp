import React, { Component } from 'react'

import List from '../components/List.jsx'
import Input from '../components/Input.jsx'
import Title from '../components/Title.jsx'

class ToDo extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    todos: ['Click to remove', 'Learn React', 'Write Code', 'Ship App'],
  }

  onAddTodo = (text) => {
    const {todos} = this.state

    console.log(JSON.stringify({text}));

    fetch('/addTodo', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({text})
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

    this.setState({
      todos: todos.filter((todo, i) => i !== index),
    })
  }

  render() {
    const {todos} = this.state

    return (
      <div style={styles.container}>
        <Title>
          To-Do List
        </Title>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <List
          list={todos}
          onClickItem={this.onRemoveTodo}
        />
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