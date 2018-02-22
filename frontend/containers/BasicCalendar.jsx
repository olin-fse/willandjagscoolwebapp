import React from 'react';
import BigCalendar from 'react-big-calendar';


class BasicCalendar extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    dummyEvents: [
          {
            allDay: false,
            endDate: new Date('February 21, 2018 11:13:00'),
            startDate: new Date('February 09, 2018 11:13:00'),
            title: 'hi',
          },
          {
            allDay: true,
            startDate: new Date('February 09, 2018 11:13:00'),
            endDate: new Date('February 09, 2018 11:13:00'),
            title: 'All Day Event',
          },
        ]
  }

  componentWillUpdate() {
    console.log("got here...")
    console.log(this.props.data);
  }

  render() {
    return (
          <div>
              <BigCalendar
                events={this.state.dummyEvents}
                startAccessor="startDate"
                endAccessor="endDate"
                style={{height: 800}}
                defaultDate={new Date()}
              />
          </div>
        )
    }
}

export default BasicCalendar;