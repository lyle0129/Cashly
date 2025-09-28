import { useState } from "react";
import { formatDate } from "../hooks/utils";

export default function PaginatedTransactions({ transactions, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const currentTransactions = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const confirmDelete = (tx) => {
    setSelectedTx(tx);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTx) {
      handleDelete(selectedTx.id);
      setShowConfirm(false);
      setSelectedTx(null);
    }
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 relative">
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-6">
          No transactions found.
        </p>
      ) : (
        <>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition mb-2"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition mb-2"
            >
              Next
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                      {formatDate(tx.created_at)}
                    </td>
                    <td className="py-2 px-4 text-gray-800 dark:text-gray-100">
                      {tx.title}
                    </td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        tx.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ₱{Math.abs(tx.amount).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                      {tx.category}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        onClick={() => confirmDelete(tx)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {currentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(tx.created_at)}
                  </span>
                  <button
                    className="px-2 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => confirmDelete(tx)}
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">
                  {tx.title}
                </p>
                <p
                  className={`mt-1 font-semibold ${
                    tx.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ₱{Math.abs(tx.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tx.category}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Delete this transaction?
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {selectedTx?.title} – ${Math.abs(selectedTx?.amount).toFixed(2)}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
