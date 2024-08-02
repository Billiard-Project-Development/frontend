import { TrashSimple } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../components/admin/AdvancedTable";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";
import AddTablePopup from "../../components/popup/addTablePopup";
import {
  deleteTransactionById,
  getAllTransaction
} from "../../redux/actions/transaction/transaction";
import { resetStateGetAllTransaction } from "../../redux/features/transaction/getAllTransactionSlice";

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
      cell: ({ row }) => {
        return (
          <>
            {row.original.statusTransaksi === "Success" ? (
              <div className="flex items-center justify-center text-accentGreen bg-accentSoftGreen rounded-lg text-center py-2 w-full">
                Sudah
              </div>
            ) : row.original.statusTransaksi === "Pending" ? (
              <div className="flex items-center justify-center text-accentGreen bg-accentSoftGreen rounded-lg text-center py-2 w-full">
                Pending
              </div>
            ) : (
              <div className="flex items-center justify-center text-accentGreen bg-accentSoftGreen rounded-lg text-center py-2 w-full">
                Batal
              </div>
            )}
          </>
        );
      }
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
  const [selectedId, setSelectedId] = useState([]);

  const dispatch = useDispatch();
  const handleOpenAddtablePopup = () => {
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
    selectedId?.forEach((element, i) => {
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
            handleOpenAddtablePopup={handleOpenAddtablePopup}
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
