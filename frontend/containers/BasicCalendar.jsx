import React from 'react';
import BigCalendar from 'react-big-calendar';
//import moment from 'moment';

//BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const BasicCalendar = props => {
    
  const dummyEvents = [
    {
      allDay: false,
      endDate: new Date('December 10, 2017 11:13:00'),
      startDate: new Date('December 09, 2017 11:13:00'),
      title: 'hi',
    },
    {
      allDay: true,
      startDate: new Date('December 09, 2017 11:13:00'),
      endDate: new Date('December 09, 2017 11:13:00'),
      title: 'All Day Event',
    },
  ];
  return (
     <div>
         <BigCalendar
          events={dummyEvents}
          startAccessor="startDate"
          endAccessor="endDate"
          style={{height: 800}}
          defaultDate={new Date()}
        />
     </div>
  )
}

export default BasicCalendar;