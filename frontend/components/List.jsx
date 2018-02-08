import React, { Component } from "react";

class List extends React.Component {
  constructor(props){
    super(props);
  }

  renderItem = (text, i) => {
    const { onClickItem } = this.props;

    return (
      <div style={styles.item} onClick={() => onClickItem(i)}>
        {text}
      </div>
    );
  };

  render() {
    const { list } = this.props;

    return (
      <div style={styles.container}>
        {list.map(this.renderItem)}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    backgroundColor: "whitesmoke",
    marginBottom: 5,
    padding: 15
  }
};

export default List;