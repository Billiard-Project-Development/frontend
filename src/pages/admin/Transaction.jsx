import React, { useEffect, useState } from "react";
import AdvancedTable from "../../components/admin/AdvancedTable";
import mData from "../../MOCK_DATA.json"; // Import the data here
import AddTablePopup from "../../components/popup/addTablePopup";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransaction } from "../../redux/actions/transaction/transaction";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";

const Transaction = () => {
  const transactionColumns = [
    {
      header: "ID Transaksi",
      accessorKey: "transaksiId"
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
      accessorKey: "tanggalTransaksi"
    },
    {
      header: "Nominal",
      accessorKey: "totalHarga"
    },
    {
      header: "Meja",
      accessorKey: "noMeja"
    },
    {
      header: "Metode Bayar",
      accessorKey: "paymentMethod"
    }
  ];

  const {
    getAllTransactionResponse,
    getAllTransactionLoading,
    getAllTransactionError,
    getAllTransactionSuccess
  } = useSelector((state) => state.getAllTransaction);

  const [openAddTablePopup, setOpenAddTablePopup] = useState(false);

  const dispatch = useDispatch();
  const handleOpentablePopup = () => {
    setOpenAddTablePopup(true);
  };

  useEffect(() => {
    dispatch(getAllTransaction());
  }, [dispatch]);

  const data = getAllTransactionResponse?.data;

  console.log("getAllTransactionResponse:", getAllTransactionResponse);
  return (
    <div>
      <AddTablePopup
        isOpen={openAddTablePopup}
        onClose={() => {
          setOpenAddTablePopup(false);
        }}
      />
      <div className="flex-1 h-screen overflow-y-auto">
        {getAllTransactionLoading ? (
          <div className="mt-40  flex items-center justify-center">
            <ContinueLoader1 />
          </div>
        ) : getAllTransactionError ? (
          <div className="mt-40  flex items-center justify-center">
            {getAllTransactionError}
          </div>
        ) : getAllTransactionResponse !== null ? (
          <AdvancedTable
            columns={transactionColumns}
            data={data}
            tableName={"Transaksi Masuk"}
            handleOpentablePopup={handleOpentablePopup}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Transaction;
