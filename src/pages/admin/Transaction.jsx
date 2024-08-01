import React, { useEffect, useState } from "react";
import AdvancedTable from "../../components/admin/AdvancedTable";
import mData from "../../MOCK_DATA.json"; // Import the data here
import AddTablePopup from "../../components/popup/addTablePopup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransactionById,
  getAllTransaction
} from "../../redux/actions/transaction/transaction";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";
import { resetStateGetAllTransaction } from "../../redux/features/transaction/getAllTransactionSlice";
import { TrashSimple } from "@phosphor-icons/react";

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
    },
    {
      header: "Bayar",
      accorsorKey: "statusTransaksi",
      cell: (props) => (
        <div className="flex items-center justify-center text-accentGreen bg-accentSoftGreen rounded-lg text-center py-2 w-full">
          Sudah
        </div>
      )
    },
    {
      header: "Aksi",
      accessorKey: "no",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              handleDeleteRow(row.original.transaksiId);
            }}
            className="flex items-center justify-center px-3 py-2 rounded-xl border-2 border-primarySoftgray"
          >
            <TrashSimple className="text-accentRed" size={24} />
          </button>
        </div>
      )
    }
  ];

  const handleDeleteRow = (rowId) => {
    dispatch(deleteTransactionById(rowId)).then(() => {
      dispatch(getAllTransaction());
    });
  };

  const {
    getAllTransactionResponse,
    getAllTransactionLoading,
    getAllTransactionError,
    getAllTransactionSuccess
  } = useSelector((state) => state.getAllTransaction);

  const { deleteTransactionByIdLoading, deleteTransactionByIdSuccess } =
    useSelector((state) => state.deleteTransactionById);

  const [openAddTablePopup, setOpenAddTablePopup] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState([]);

  const dispatch = useDispatch();
  const handleOpentablePopup = () => {
    setOpenAddTablePopup(true);
  };

  useEffect(() => {
    dispatch(getAllTransaction());
    if (deleteTransactionByIdSuccess === true) {
      dispatch(getAllTransaction()).then(() => {
        dispatch(resetStateGetAllTransaction());
      });
    }
  }, [dispatch, deleteTransactionByIdSuccess]);

  const handleDeleteSelected = () => {
    selectedTransactionId?.forEach((element, i) => {
      dispatch(deleteTransactionById(element));
    });
  };

  const data = getAllTransactionResponse?.data;

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
            handleDeleteSelected={handleDeleteSelected}
            idNameToSelect={"transaksiId"}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Transaction;
