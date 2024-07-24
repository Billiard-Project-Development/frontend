import { Wallet } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import AddTablePopup from "../../components/popup/addTablePopup";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooking } from "../../redux/actions/booking/booking";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";
import AdvancedTable from "../../components/admin/AdvancedTable";
const BookingList = () => {
  const tablesColumns = [
    {
      header: "ID Booking",
      accessorKey: "bookingId"
    },
    {
      header: "Nama",
      accessorKey: "namaPenyewa"
    },
    {
      header: "No HP",
      accessorKey: "noHp"
    },
    {
      header: "Lama Sewa",
      accessorKey: "lamaSewa"
    },
    {
      header: "Tanggal",
      accessorKey: "tanggalBooking"
    }
  ];

  const {
    getAllBookingResponse,
    getAllBookingLoading,
    getAllBookingError,
    getAllBookingSuccess
  } = useSelector((state) => state.getAllBooking);

  const data = getAllBookingResponse?.data;

  const [openAddTablePopup, setOpenAddTablePopup] = useState(false);

  const dispatch = useDispatch();
  const handleOpentablePopup = () => {
    setOpenAddTablePopup(true);
  };

  useEffect(() => {
    dispatch(getAllBooking());
  }, [dispatch]);

  console.log("getAllBookingResponse:", getAllBookingResponse);
  return (
    <div>
      <AddTablePopup
        isOpen={openAddTablePopup}
        onClose={() => {
          setOpenAddTablePopup(false);
        }}
      />
      <div className="flex-1 h-screen overflow-y-auto">
        {getAllBookingLoading ? (
          <div className="mt-40  flex items-center justify-center">
            <ContinueLoader1 />
          </div>
        ) : getAllBookingError ? (
          <div className="mt-40  flex items-center justify-center">
            {getAllBookingError}
          </div>
        ) : getAllBookingResponse !== null ? (
          <AdvancedTable
            columns={tablesColumns}
            data={data}
            tableName={"Meja Billiard"}
            handleOpentablePopup={handleOpentablePopup}
          />
        ) : null}
      </div>
    </div>
  );
};

export default BookingList;
