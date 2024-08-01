import { isValid, parse } from "date-fns";

export const parseCustomDate = (dateString) => {
  const parsedDate = parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

export const getFormattedDateAndTime = () => {
  const now = new Date();

  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];

  const monthsOfYear = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = String(now.getDate()).padStart(2, "0");
  const month = monthsOfYear[now.getMonth()];
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} • ${hours}:${minutes} WIB`;

  return formattedDate;
};
