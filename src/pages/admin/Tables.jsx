import React, { useState } from "react";
import AdvancedTable from "../../components/admin/AdvancedTable";
import mData from "../../TABLE_DATA.json";
import AddTablePopup from "../../components/popup/addTablePopup";

const Tables = () => {
  const tablesColumns = [
    {
      header: "ID Meja",
      accessorKey: "id_meja"
    },
    {
      header: "Nama",
      accessorKey: "nama"
    },
    {
      header: "Harga",
      accessorKey: "harga"
    },
    {
      header: "Deskripsi",
      accessorKey: "deskripsi"
    },
    {
      header: "Foto Meja",
      accessorKey: "foto_meja"
    }
  ];

  const [openAddTablePopup, setOpenAddTablePopup] = useState(false);
  const handleOpentablePopup = () => {
    setOpenAddTablePopup(true);
  };
  console.log("mData:", mData); // Debugging: Check the data structure
  console.log("openAddTablePopup:", openAddTablePopup);

  return (
    <div>
      <AddTablePopup
        isOpen={openAddTablePopup}
        onClose={() => {
          setOpenAddTablePopup(false);
        }}
      />
      <div className="flex-1 h-screen overflow-y-auto">
        <AdvancedTable
          columns={tablesColumns}
          data={mData}
          tableName={"Meja Billiard"}
          handleOpentablePopup={handleOpentablePopup}
        />
      </div>
    </div>
  );
};

export default Tables;
