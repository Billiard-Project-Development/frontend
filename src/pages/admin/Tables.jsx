import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../components/admin/AdvancedTable";
import ContinueLoader1 from "../../components/loaders/ContinueLoader1";
import AddTablePopup from "../../components/popup/addTablePopup";
import UpdateTablePopup from "../../components/popup/updateTablePopup";
import {
  deleteProduct,
  getAllProduct
} from "../../redux/actions/product/product";

const Tables = () => {
  const dispatch = useDispatch();

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
    },
    {
      header: "Aksi",
      accesorKey: "product_id",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleOpenUpdateTablePopup(row.original)}
            className="flex items-center justify-center px-3 py-2 rounded-xl border-2 border-primarySoftgray"
          >
            <PencilSimple className="text-primaryBlack" size={24} />
          </button>
          <button
            onClick={() => handleDeleteRow(row.original.product_id)}
            className="flex items-center justify-center px-3 py-2 rounded-xl border-2 border-primarySoftgray"
          >
            <TrashSimple className="text-accentRed" size={24} />
          </button>
        </div>
      )
    }
  ];

  const handleDeleteRow = async (rowId) => {
    console.log("dis row:", rowId);
    const deleteBody = {
      produkId: rowId
    };
    await dispatch(deleteProduct(deleteBody));
    setTimeout(() => {
      dispatch(getAllProduct());
    }, 1000);
  };

  const handleDeleteSelected = () => {
    selectedId?.forEach((element, i) => {
      const deleteBody = {
        produkId: element
      };

      console.log("element:", element);
      dispatch(deleteProduct(deleteBody));
    });
  };

  const [openAddTablePopup, setOpenAddTablePopup] = useState(false);
  const [openUpdateTablePopup, setOpenUpdateTablePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const [selectedId, setSelectedId] = useState([]);

  const handleOpenAddtablePopup = () => {
    setOpenAddTablePopup(true);
  };
  const handleOpenUpdateTablePopup = async (data) => {
    await setSelectedData(data);
    setOpenUpdateTablePopup(true);

    console.log("selectedProductId", selectedProductId);
  };

  const {
    getAllProductResponse,
    getAllProductLoading,
    getAllProductError,
    getAllProductSuccess
  } = useSelector((state) => state.getAllProduct);
  const data = getAllProductResponse?.data;
  console.log("getAllProductResponse:", getAllProductResponse);

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
      <UpdateTablePopup
        isOpen={openUpdateTablePopup}
        onClose={() => {
          setOpenUpdateTablePopup(false);
        }}
        selectedProductId={selectedProductId}
        selectedData={selectedData}
      />

      <div className="flex-1">
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
            handleOpenAddtablePopup={handleOpenAddtablePopup}
            idNameToSelect={"product_id"}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            handleDeleteSelected={handleDeleteSelected}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Tables;
