import React from 'react';
import ReactDOM from 'react-dom';

import ToDo from "./containers/ToDo.jsx";
import BasicCalendar from './containers/BasicCalendar.jsx';
import Calendar from './containers/Calendar.jsx';
import CalendarApp from './containers/CalendarApp.jsx';
import LocalLogin from "./components/LocalLogin.jsx";

import localizer from 'react-big-calendar/lib/localizers/moment.js';
import moment from 'moment';

localizer(moment);

import 'react-big-calendar/lib/less/styles.less';
import 'bootstrap/dist/css/bootstrap.css';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    };
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render () {
    if (this.state.user) {
      console.log('success')
      return <CalendarApp user={this.state.user}/>;
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