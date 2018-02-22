import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ToDo from './ToDo.jsx';
import BasicCalendar from './BasicCalendar.jsx';

class CalendarApp extends React.Component {

    constructor(props){
        super(props);
        this.onSubmitToCal = this.onSubmitToCal.bind(this);

        this.state = {
          data: []
        }
    }

    onSubmitToCal(toDos) {
      const {data} = this.state;
      console.log(toDos);

      this.setState({
        data: toDos,
      })
      console.log(data);

    }

    render() {
        return (
          <Grid fluid>
            <Row>
              <Col xs={12} sm={4} md={4} lg={2}>
                <ToDo user={this.props.user} onSubmitToCal={this.onSubmitToCal}/>
              </Col>
              <Col xs={12} sm={8} md={8} lg={10}>
                <BasicCalendar data={this.state.data}/>
              </Col>
            </Row>
          </Grid>
        );
      }
   
}

export default CalendarApp;