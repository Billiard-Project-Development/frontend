import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../components/admin/AdvancedTable";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";
import AddTablePopup from "../../components/popup/addTablePopup";
import { getAllBooking } from "../../redux/actions/booking/booking";
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
  const handleOpenAddtablePopup = () => {
    setOpenAddTablePopup(true);
  };

  // const handleDeleteSelected = () => {
  //   selectedTransactionId?.forEach((element, i) => {
  //     dispatch(deleteTransactionById(element));
  //   });
  // };

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
            tableName={"Booking List"}
            handleOpenAddtablePopup={handleOpenAddtablePopup}
            // handleDeleteSelected={handleDeleteSelected}
          />
        ) : null}
      </div>
    </div>
  );
};

export default BookingList;
