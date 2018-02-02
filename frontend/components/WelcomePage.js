var React = require('react');
var ReactDOM = require('react-dom');

class WelcomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
  }

  render(){
    return (
      <div>
        {"Welcome " + this.props.user.Username + "!"}
      </div>
    );
  }
}

module.exports = WelcomePage;