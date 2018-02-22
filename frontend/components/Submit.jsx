import React, { Component } from "react";

class Submit extends React.Component {
  render() {
    return (
      <div style={styles.header}>
        <div style={styles.submitButton} onClick={this.handleClick}>Add to Calendar</div>
      </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: "skyblue",
    padding: 15
  },
  submitButton: {
    textAlign: "center",
    color: "white"
  }
};

export default Submit;