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

  // componentWillUpdate() {
  //   console.log("got here...")
  //   console.log(this.props.data);
  // }

  componentWillReceiveProps(props) {
    const {dummyEvents} = this.state;

    // const {tasks} = props.data;
    var calEntries = []

    for (var i = 0; i < props.data.length; i++) {
      var day = Math.floor(Math.random() * 30) + 1
      calEntries.push(
        {
          allDay: false,
          endDate: new Date('February ' + day +', 2018 11:13:00'),
          startDate: new Date('February ' + day +', 2018 11:13:00'),
          title: props.data[i],
        }
      );
    }
    this.setState({dummyEvents: [...calEntries, ...dummyEvents]});
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