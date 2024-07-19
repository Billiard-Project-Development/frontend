import React, { useState } from "react";
import AdvancedTable from "../../components/admin/AdvancedTable";
import mData from "../../MOCK_DATA.json"; // Import the data here
import AddTablePopup from "../../components/popup/addTablePopup";

const Transaction = () => {
  const transactionColumns = [
    {
      header: "Nama",
      accessorKey: "name"
    },
    {
      header: "No HP",
      accessorKey: "phone"
    },
    {
      header: "Lama Sewa",
      accessorKey: "duration"
    },
    {
      header: "Tanggal",
      accessorKey: "date"
    },
    {
      header: "Nominal",
      accessorKey: "price"
    },
    {
      header: "Meja",
      accessorKey: "table"
    },
    {
      header: "Metode Bayar",
      accessorKey: "transaction_method"
    }
  ];

  return (
    <div>
      <div className="w-full">
        <AdvancedTable
          columns={transactionColumns}
          data={mData}
          tableName={"Transaksi Masuk"}
        />
      </div>
    </div>
  );
};

export default Transaction;
