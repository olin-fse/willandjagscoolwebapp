import React from 'react';
import ReactDOM from 'react-dom';

import SubmitOnEnterForm from './components/SubmitOnEnterForm.jsx';
import WelcomePage from './components/WelcomePage.jsx';
import toDo from "./containers/toDo.jsx";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: null};
    this.setUsername = this.setUsername.bind(this);
  }

  setUsername(username) {
    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'username='+username
    })
      .then((response) => { return response.json(); })
      .then((json) => { this.setState({ user: json.user }); });
  }

  render () {
    let loginForm = (
      <div>
       <SubmitOnEnterForm
       placeholder="Enter Username"
       onSubmit={this.setUsername} />
      </div>
    )

    let welcomePage = <WelcomePage user={this.state.user}/>

    let toDo = <toDo/>

    if (this.state.user) {
      return toDo;
    } else{
      return loginForm;
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)