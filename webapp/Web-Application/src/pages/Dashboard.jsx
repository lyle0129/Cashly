import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useTransactions } from "../hooks/useTransactions";
import { formatDate } from "../hooks/utils";
import CreateTransaction from "../components/CreateTransaction";
import BreakdownChart from "../components/BreakdownChart";
import "./styles/Dashboard.css";
import PaginatedTransactions from "../components/PaginatedTransactions";
import Summary from "../components/Summary";
import DateRangeFilter from "../components/DateRangeFiller";


export default function Dashboard() {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState({ low: null, high: null });

  const { transactions, summary, breakdown ,isLoading, loadData, deleteTransaction } =
    useTransactions(user?.id);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navbar */}
      <div className="navbar">
      <h2>Welcome to Cashly, {user?.emailAddresses[0]?.emailAddress.split("@")[0]} !!</h2>
      
        <UserButton afterSignOutUrl="/login" />
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter
        onApply={(low, high) => {
          setDateRange({ low, high });
          loadData(low, high)}
        }
        onReset={() => {
          setDateRange({ low: null, high: null });
          loadData()}}
      />

      {/* Show active date range */}
      <div className="mt-4 text-center">
        {dateRange.low && dateRange.high ? (
          <p className="text-sm font-semibold text-gray-700 bg-gray-100 inline-block px-4 py-2 rounded-lg shadow">
            Showing from {formatDate(dateRange.low)} to {formatDate(dateRange.high)}
          </p>
          ):<p className="text-sm font-semibold text-gray-700 bg-gray-100 inline-block px-4 py-2 rounded-lg shadow">
            Showing all Transactions
          </p> 
        }
      </div>
      

      {/* SUMMARY CARDS */}
      <Summary summary={summary} />

      {/* Breakdown Pie Chart */}
      <BreakdownChart breakdown={breakdown} />

      {/* Create Transactions */}
      <CreateTransaction />

      {/* TRANSACTIONS */}
      <button onClick={handleRefresh} disabled={refreshing}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
      <h3>Recent Transactions</h3>
      <PaginatedTransactions transactions={transactions} handleDelete={handleDelete} />
      


    </div>
  );
}
