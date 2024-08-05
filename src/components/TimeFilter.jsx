import { Calendar, CaretLeft, CaretRight, Clock } from "@phosphor-icons/react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { id } from "date-fns/locale";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      <div className="flex items-center h-full lg:h-[87px] bg-primaryWhite rounded-xl shadow-lg font-semibold text-14 lgtext-16 py-2 lg:py-0">
        <div className="flex items-center px-2 lg:px-5">
          <div className="relative">
            <button
              onClick={() => setDatePickerOpen(!datePickerOpen)}
              className="text-primaryOrange hover:bg-primaryOrange hover:text-white transition-all  ease-in-out duration-200 p-2 rounded-lg flex items-center gap-2"
            >
              {/* <FaCalendarAlt /> */}
              <Calendar className="w-5 h-5 lg:w-8 lg:h-w-8 h-full" />
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
        <div className="flex items-center gap-3 border-l-2 border-r-2 border-primarySoftgray px-1 lg:px-5">
          <button
            onClick={handlePreviousWeek}
            className="p-1 rounded-lg text-primaryDarkgray hover:bg-primaryOrange hover:text-white transition-all ease-in-out duration-200"
          >
            <CaretLeft className="w-5 h-5 lg:w-8 lg:h-w-8 h-full" />
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 md:gap-2">
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
            <CaretRight className="w-5 h-5 lg:w-8 lg:h-w-8 h-full" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-3 items-center px-2 lg:px-5 text-primaryOrange max-w-[65px] sm:max-w-full text-center">
          <Clock className="w-5 h-5 lg:w-8 lg:h-w-8 h-full" />
          <span className="text-14 lg:text-16">Filter Waktu</span>
        </div>
      </div>
    </div>
  );
};

export default TimeFilter;
