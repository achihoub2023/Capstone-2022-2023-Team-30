import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date: Date) => {
    setSelectedDate(date.toLocaleDateString());
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
}

export default Calendar;
