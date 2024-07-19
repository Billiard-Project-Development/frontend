// @ts-nocheck
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";
import mData from "../../MOCK_DATA.json";
import { useMemo, useState } from "react";
import {
  CaretLeft,
  CaretRight,
  CaretUpDown,
  MagnifyingGlass
} from "@phosphor-icons/react";

export default function BasicTable(props) {
  const { columns, data } = props;

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  });

  console.log("table:", table.getCanNextPage());
  return (
    <>
      <div className="w-full max-h-full p-5 bg-primaryWhite rounded-xl border border-primarySoftgray">
        <div className="flex flex-col gap-5">
          <div className="w-full divide-y">
            <p className="text-16 font-medium">Transaksi Masuk</p>
          </div>
          <div className="w-full border flex items-center gap-3 px-6 py-2 rounded-xl">
            <MagnifyingGlass size={24} />
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Cari Nama"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
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
