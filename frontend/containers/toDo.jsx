import React, { Component } from 'react'

import List from '../components/List.jsx'
import Input from '../components/Input.jsx'
import Title from '../components/Title.jsx'

export default class App extends Component {

  state = {
    todos: ['Click to remove', 'Learn React', 'Write Code', 'Ship App'],
  }

  onAddTodo = (text) => {
    const {todos} = this.state

    this.setState({
      todos: [text, ...todos],
    })
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
