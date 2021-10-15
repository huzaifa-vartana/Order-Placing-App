import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerWrapper = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        props.sendData(date);
      }}
      minDate={new Date()}
      maxDate={addDays(new Date(), 2)}
      placeholderText="This only includes today and tomorrow"
    />
  );
};
