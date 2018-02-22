import React, { Component } from "react";

class Submit extends React.Component {
  constructor(props){
    super(props);
    this.state = {isToggleOn: true};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        } 

    render() {
    const { children } = this.props;

    return (
    <div style={styles.header}>
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'} style={styles.header}
      </button>
    </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: "skyblue",
    padding: 15
  },
  label: {
    textAlign: "center",
    color: "white"
  }
};

export default Submit;