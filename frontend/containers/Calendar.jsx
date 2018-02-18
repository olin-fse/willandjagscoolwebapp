import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer



const Calendar = props => {
    
  const dummyEvents = [
    {
      allDay: false,
      end: new Date('December 10, 2017 11:13:00'),
      start: new Date('December 09, 2017 11:13:00'),
      title: 'hi',
    },
    {
      allDay: true,
      end: new Date('December 09, 2017 11:13:00'),
      start: new Date('December 09, 2017 11:13:00'),
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
        />
     </div>
  )
}

export default Calendar;