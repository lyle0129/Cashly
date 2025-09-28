import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useTransactions } from "../hooks/useTransactions";
import { formatDate } from "../hooks/utils";
import CreateTransaction from "../components/CreateTransaction";
import BreakdownChart from "../components/BreakdownChart";
import PaginatedTransactions from "../components/PaginatedTransactions";
import Summary from "../components/Summary";
import DateRangeFilter from "../components/DateRangeFiller";


export default function Dashboard({ isDark, toggleTheme }) {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState({ low: null, high: null });

  const { transactions, summary, breakdown ,isLoading, loadData, deleteTransaction } =
    useTransactions(user?.id);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="">
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6 dark:text-gray-100  dark:bg-gray-900">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow rounded-xl px-6 py-4 mb-6">
          <h2 className="text-xl font-bold">
            Welcome to Cashly,{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
            </span>{" "}
            !!
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </button>
            <UserButton afterSignOutUrl="/login" />
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 mb-6">
          <DateRangeFilter
            onApply={(low, high) => {
              setDateRange({ low, high });
              loadData(low, high);
            }}
            onReset={() => {
              setDateRange({ low: null, high: null });
              loadData();
            }}
          />

          {/* Show active date range */}
          <div className="mt-3 text-center">
            {dateRange.low && dateRange.high ? (
              <p className="text-sm font-semibold bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
                Showing from {formatDate(dateRange.low)} to {formatDate(dateRange.high)}
              </p>
            ) : (
              <p className="text-sm font-semibold bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
                Showing all transactions
              </p>
            )}
          </div>
        </div>
        

        {/* SUMMARY CARDS */}
        <div className="mb-6">
          <Summary summary={summary} />
        </div>

        {/* Breakdown Pie Chart */}
        <BreakdownChart breakdown={breakdown} />

        {/* Create Transactions */}
        <CreateTransaction />

        {/* TRANSACTIONS */}
        {/* Transactions List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          <PaginatedTransactions transactions={transactions} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
    
  );
}
