import React, { Component } from 'react'

import List from '../components/List.jsx'
import Input from '../components/Input.jsx'
import Title from '../components/Title.jsx'

class ToDo extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    todos: [null],
  }

  componentDidMount(){
    console.log("i mounted boiii");

    fetch('/showTodos', {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
      .then((response) => { return response.json(); })
      .then((json) => { console.log(json); this.setState(json); });
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
      .then((response) => { console.log(response); return response.json(); })
      .then((json) => { 
        this.setState({
          todos: todos.filter((todo, i) => i !== index),
        })
      });
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