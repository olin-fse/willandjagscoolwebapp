import React from 'react';
import ReactDOM from 'react-dom';

import ToDo from "./containers/ToDo.jsx";
//import BasicCalendar from './containers/BasicCalendar.jsx';
//import Basic from './containers/Basic.jsx';
import LocalLogin from "./components/LocalLogin.jsx"
import 'react-big-calendar/lib/less/styles.less'
import 'bootstrap/dist/css/bootstrap.css'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    };

    // this.setUser = this.setUser.bind(this);
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render () {
    if (this.state.user) {
      console.log('success')
      return <ToDo/>;
    } else{
      console.log('fail')
      return <LocalLogin setUser={this.setUser}/>;
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)