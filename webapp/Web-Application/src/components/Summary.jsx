import React from 'react';

function Summary({summary}) {
  return (
    <div className="grid gap-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Balance</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">₱{parseFloat(summary.balance).toFixed(2)}</p>
      </div>
      {/* Income + Expenses Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Income */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Income
          </h3>
          <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            +₱{parseFloat(summary.income).toFixed(2)}
          </p>
        </div>

        {/* Expenses */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Expenses
          </h3>
          <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
            -₱{Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Summary