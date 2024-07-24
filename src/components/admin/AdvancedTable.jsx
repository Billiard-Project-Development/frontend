// @ts-nocheck
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";
import {
  CaretLeft,
  CaretRight,
  CaretUpDown,
  FileXls,
  MagnifyingGlass,
  Plus,
  TrashSimple
} from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import CustomDateInput from "./CustomDateInput"; // Import the custom input component
import { se } from "date-fns/locale";

export default function AdvancedTable({
  columns,
  data,
  tableName,
  handleOpentablePopup
}) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "data.xlsx");
  };

  console.log("selectedRows:", selectedRows);
  console.log("data ini:", data);
  const handleRowSelect = (rowId, index) => {
    const transactionId = data?.[index]?.transaksiId;
    const bookingId = data?.[index]?.bookingId;
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    setSelectedTransactionId(transactionId);
    setSelectedBookingId(bookingId);
    // Log the value directly
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allRowIds = new Set(data.map((_, index) => index));
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  console.log("yas data:", data);
  console.log("yas selectAll:", selectAll);

  const columnsWithImage = useMemo(
    () =>
      columns.map((column) => {
        if (column.header === "Foto Meja") {
          return {
            ...column,
            cell: ({ row }) => (
              <div className="w-full flex items-center justify-center">
                {" "}
                <img
                  src={`data:${row.original.mime_type};base64,${row.original.foto_product}`}
                  alt="Foto Meja"
                  className="w-16 h-14 rounded-xl object-cover"
                />
              </div>
            )
          };
        }
        return column;
      }),
    [columns]
  );

  const table = useReactTable({
    data,
    columns: useMemo(
      () => [
        {
          header: ({ table }) => (
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          ),
          id: "select",
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={selectedRows.has(row.id)}
              onChange={() => handleRowSelect(row.id, row.index)}
            />
          )
        },
        ...columnsWithImage
      ],
      [columnsWithImage, selectedRows, selectAll]
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      pagination
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination
  });

  console.log("table.getRowModel().rows:", table.getRowModel().rows); // Debugging: Check the rows generated by the table

  return (
    <>
      <div className="w-full max-h-full p-5 bg-primaryWhite rounded-xl border border-primarySoftgray">
        <div className="flex flex-col gap-5">
          <div className="w-full divide-y">
            <p className="text-16 font-medium">{tableName}</p>
          </div>
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-3 text-12">
              <label className="font-normal">Tampilkan</label>
              <select
                className="font-medium px-2 py-3 rounded-xl border border-primarySoftgray"
                value={pagination.pageSize}
                onChange={(e) =>
                  setPagination({
                    ...pagination,
                    pageSize: Number(e.target.value)
                  })
                }
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 w-fit min-w-[316px] border flex items-center gap-3 px-6 py-2 rounded-xl">
              <MagnifyingGlass size={24} />
              <input
                type="text"
                className="w-full focus:outline-none"
                placeholder="Cari Nama"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </div>
            {tableName === "Meja Billiard" ? (
              <button
                onClick={handleOpentablePopup}
                className="flex items-center gap-2 px-3 py-2 border-2 border-primarySoftgray rounded-xl"
              >
                <Plus className="text-accentGreen" size={24} />
                <p className="text-12 font-medium text-accentGreen">
                  Tambah Meja
                </p>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={<CustomDateInput />}
                  />
                </div>
                <button
                  className="flex items-center gap-2 px-3 py-2 border-2 border-primarySoftgray rounded-xl"
                  onClick={handleExport}
                >
                  <FileXls size={24} />
                  <p className="text-12 font-medium">Export ke Spreadsheet</p>
                </button>
              </div>
            )}

            <button className="flex items-center gap-2 px-3 py-2 border-2 border-primarySoftgray rounded-xl">
              <TrashSimple className="text-accentRed" size={24} />
              <p className="text-12 font-medium text-accentRed">Hapus Semua</p>
            </button>
          </div>
        </div>
        <table className="w-full divide-y text-center text-12 font-medium">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    className="py-5"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: <CaretUpDown />,
                        desc: <CaretUpDown />
                      }[header.column.getIsSorted() ?? null]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="py-5" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-3 text-12">
          <button
            className={`flex items-center justify-center transition ease-in-out duration-200 ${
              table.getCanPreviousPage()
                ? "bg-primaryWhite"
                : "bg-primarySoftgray text-primaryDarkgray"
            }  w-6 h-6  rounded-lg shadow-xl`}
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <CaretLeft size={16} />
          </button>
          {table.getPageOptions().map((page, index) => (
            <button
              key={index}
              onClick={() => table.setPageIndex(page)}
              className={`flex items-center justify-center text-primaryBlack w-6 h-6 transition ease-in-out duration-200 ${
                table.getState().pagination.pageIndex === page
                  ? " bg-primaryBlack text-primaryWhite"
                  : "bg-primaryWhite"
              } rounded-lg shadow-xl `}
            >
              {page + 1}
            </button>
          ))}
          <button
            className={`flex items-center justify-center transition ease-in-out duration-200 ${
              table.getCanNextPage()
                ? "bg-primaryWhite"
                : "bg-primarySoftgray text-primaryDarkgray"
            }  w-6 h-6  rounded-lg shadow-xl`}
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <CaretRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
