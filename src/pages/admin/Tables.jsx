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
import RemoveConfirmationPopup from "../../components/popup/removeConfirmationPopup";
import SuccessRegistration from "../../components/popup/successRegistration";
import { resetStateDeleteProduct } from "../../redux/features/product/deleteProductSlice";
import SuccessPopup from "../../components/popup/successPopup";
import { resetStateAddProduct } from "../../redux/features/product/addProductSlice";

const Tables = () => {
  const { deleteProductSuccess } = useSelector((state) => state.deleteProduct);
  const { addProductSuccess } = useSelector((state) => state.addProduct);
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
            onClick={() => handleDelteRowOpen(row.original.product_id)}
            className="flex items-center justify-center px-3 py-2 rounded-xl border-2 border-primarySoftgray"
          >
            <TrashSimple className="text-accentRed" size={24} />
          </button>
        </div>
      )
    }
  ];

  const [openAddTablePopup, setOpenAddTablePopup] = useState(false);
  const [openUpdateTablePopup, setOpenUpdateTablePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const [popupDeleteRow, setPopupDeleteRow] = useState(false);
  const [popupDeleteSelected, setPopupDeleteSelected] = useState(false);
  const [popupDeleteSuccess, setPopupDeleteSuccess] = useState(false);
  const [popupAddSuccess, setPopupAddSuccess] = useState(false);

  const [selectedId, setSelectedId] = useState([]);
  const [rowIdDelete, setRowIdDelete] = useState(null);

  const handleDeleteRow = async () => {
    console.log("dis row:", rowIdDelete);
    const deleteBody = {
      produkId: rowIdDelete
    };
    setPopupDeleteRow(false);
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
      setPopupDeleteSelected(false);
    });
  };

  const handleDelteRowOpen = (rowId) => {
    setRowIdDelete(rowId);
    setPopupDeleteRow(true);
  };

  const handleDeleteSelectedOpen = () => {
    //show confirmation delete selected
    setPopupDeleteSelected(true);
  };

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

  useEffect(() => {
    if (deleteProductSuccess === true) {
      setPopupDeleteSuccess(true);
      dispatch(resetStateDeleteProduct());
      dispatch(getAllProduct());
    }
  }, [deleteProductSuccess]);

  useEffect(() => {
    if (addProductSuccess === true) {
      setPopupAddSuccess(true);
      dispatch(resetStateAddProduct());
      dispatch(getAllProduct());
    }
  }, [addProductSuccess]);

  return (
    <div>
      {/* remove confirmation popup per row */}
      <RemoveConfirmationPopup
        isOpen={popupDeleteRow}
        onClose={() => {
          setPopupDeleteRow(false);
        }}
        handleAction={handleDeleteRow}
        setPopup={setPopupDeleteRow}
        text1={"Hapus Meja"}
        text2={"Apakah kamu yakin ingin menghapus Meja?"}
      />
      {/* remove confirmation popup per selected */}
      <RemoveConfirmationPopup
        isOpen={popupDeleteSelected}
        onClose={() => {
          setPopupDeleteSelected(false);
        }}
        handleAction={handleDeleteSelected}
        setPopup={setPopupDeleteSelected}
        text1={"Hapus Meja"}
        text2={"Apakah kamu yakin ingin menghapus Meja?"}
      />
      {/* success popup delete table */}
      <SuccessPopup
        isOpen={popupDeleteSuccess}
        onClose={() => setPopupDeleteSuccess(false)}
        setPopupSuccess={setPopupDeleteSuccess}
        text1={"Berhasil Menghapus Meja!"}
        text2={"Cek lebih lanjut pada tabel Meja Billiard"}
        showButtonOk={true}
        timeout={8000}
      />
      {/* success popup add table */}
      <SuccessPopup
        isOpen={popupAddSuccess}
        onClose={() => setPopupAddSuccess(false)}
        setPopupSuccess={setPopupAddSuccess}
        text1={"Berhasil Menambahkan Meja!"}
        text2={"Cek lebih lanjut pada tabel Meja Billiard"}
        showButtonOk={true}
        timeout={8000}
      />
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
            handleDeleteSelected={handleDeleteSelectedOpen}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Tables;
