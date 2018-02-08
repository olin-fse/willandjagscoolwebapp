import React from 'react';

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

export default WelcomePage;