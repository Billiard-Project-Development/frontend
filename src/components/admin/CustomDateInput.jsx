import { Calendar } from "@phosphor-icons/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = ({ value, onClick }) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (value) {
      const formattedDate = format(value, "EEEE, dd MMMM yyyy", { locale: id });
      setCurrentDate(formattedDate);
    }
  }, [value]);

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 border-2 border-primarySoftgray rounded-xl "
      onClick={onClick}
    >
      <Calendar className="text-primaryBlack" size={24} />
      <p className="text-12 font-medium">{currentDate || "Pilih Tanggal"}</p>
    </button>
  );
};

export default CustomDateInput;
