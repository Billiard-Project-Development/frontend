import React, { useState } from "react";
import { format, addDays, startOfDay, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, CaretLeft, CaretRight, Clock } from "@phosphor-icons/react";
// import { FaCalendarAlt } from "react-icons/fa";

const TimeFilter = ({ onDateSelect }) => {
  const [currentWeek, setCurrentWeek] = useState(startOfDay(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(currentWeek, index)
  );

  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
    setCurrentWeek(startOfDay(date));
    onDateSelect(date);
    setDatePickerOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center h-[87px] bg-primaryWhite rounded-xl shadow-lg font-semibold ">
        <div className="flex items-center px-5">
          <div className="relative">
            <button
              onClick={() => setDatePickerOpen(!datePickerOpen)}
              className="text-primaryOrange hover:bg-primaryOrange hover:text-white transition-all  ease-in-out duration-200 p-2 rounded-lg flex items-center gap-2"
            >
              {/* <FaCalendarAlt /> */}
              <Calendar className="" size={32} />
            </button>
            {datePickerOpen && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded z-50">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDatePickerChange}
                  inline
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 border-l-2 border-r-2 border-primarySoftgray px-5">
          <button
            onClick={handlePreviousWeek}
            className="p-1 rounded-lg text-primaryDarkgray hover:bg-primaryOrange hover:text-white transition-all ease-in-out duration-200"
          >
            <CaretLeft size={32} />
          </button>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`p-2 rounded-lg transition-all ease-in-out duration-300 flex flex-col items-center gap-1 ${
                  isSameDay(date, selectedDate)
                    ? "bg-primaryOrange text-white"
                    : " text-primaryOrange hover:bg-primaryOrange hover:text-white hover:bg-opacity-85"
                }`}
              >
                <p>{format(date, "EEE", { locale: id })}</p>
                <p>{format(date, "dd", { locale: id })}</p>
              </button>
            ))}
          </div>
          <button
            onClick={handleNextWeek}
            className="p-1 rounded-lg text-primaryDarkgray hover:bg-primaryOrange hover:text-white transition-all ease-in-out duration-200"
          >
            <CaretRight size={32} />
          </button>
        </div>
        <div className="flex gap-3 items-center px-5 text-primaryOrange">
          <Clock size={32} />
          <span>Filter Waktu</span>
        </div>
      </div>
    </div>
  );
};

export default TimeFilter;
