import React from 'react';
import ReactDOM from 'react-dom';

import ToDo from "./containers/ToDo.jsx";
import BasicCalendar from './containers/BasicCalendar.jsx';
import Basic from './containers/Basic.jsx';
import LocalLogin from "./components/LocalLogin.jsx"
import 'react-big-calendar/lib/less/styles.less'
import 'bootstrap/dist/css/bootstrap.css'
//a lot of problems with the loader here, e.g., can't load a .ttf file or .svg
//import 'font-awesome/css/font-awesome.min.css'

import localizer from 'react-big-calendar/lib/localizers/globalize'


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
      return <BasicCalendar/>;
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