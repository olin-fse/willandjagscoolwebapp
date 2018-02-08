import React, { Component } from "react";

class Title extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { children } = this.props;

    return (
      <div style={styles.header}>
        <div style={styles.title}>{children}</div>
      </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: "skyblue",
    padding: 15
  },
  title: {
    textAlign: "center",
    color: "white"
  }
};

export default Title;