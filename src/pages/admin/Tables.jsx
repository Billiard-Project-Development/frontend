import React, { useEffect, useState } from "react";
import AdvancedTable from "../../components/admin/AdvancedTable";
import mData from "../../TABLE_DATA.json";
import AddTablePopup from "../../components/popup/addTablePopup";
import { getAllProduct } from "../../redux/actions/product/product";
import { useDispatch, useSelector } from "react-redux";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";

const Tables = () => {
  const tablesColumns = [
    {
      header: "ID Meja",
      accessorKey: "product_id"
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
  const {
    getAllProductResponse,
    getAllProductLoading,
    getAllProductError,
    getAllProductSuccess
  } = useSelector((state) => state.getAllProduct);
  const data = getAllProductResponse?.data;
  console.log("getAllProductResponse:", getAllProductResponse);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <div>
      <AddTablePopup
        isOpen={openAddTablePopup}
        onClose={() => {
          setOpenAddTablePopup(false);
        }}
      />
      <div className="flex-1 h-screen overflow-y-auto">
        {getAllProductLoading ? (
          <div className="mt-40  flex items-center justify-center">
            <ContinueLoader1 />
          </div>
        ) : getAllProductError ? (
          <div className="mt-40  flex items-center justify-center">
            {getAllProductError}
          </div>
        ) : getAllProductResponse !== null ? (
          <AdvancedTable
            columns={tablesColumns}
            data={data}
            tableName={"Meja Billiard"}
            handleOpentablePopup={handleOpentablePopup}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Tables;
