import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ToDo from './ToDo.jsx';
import BasicCalendar from './BasicCalendar.jsx';

class CalendarApp extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
          <Grid fluid>
            <Row>
              <Col xs={12} sm={4} md={4} lg={2}>
                <ToDo user={this.props.user}/>
              </Col>
              <Col xs={12} sm={8} md={8} lg={10}>
                <BasicCalendar/>
              </Col>
            </Row>
          </Grid>
        );
      }
   
}

export default CalendarApp;