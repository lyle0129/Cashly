import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useTransactions } from "../hooks/useTransactions";
import { formatDate } from "../hooks/utils";
import CreateTransaction from "../components/CreateTransaction";
import BreakdownChart from "../components/BreakdownChart";
import TransactionsList from "../components/TransactionsList";
import "./styles/Dashboard.css";
import PaginatedTransactions from "../components/PaginatedTransactions";


export default function Dashboard() {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

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
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
      <h2>Welcome to Cashly, {user?.emailAddresses[0]?.emailAddress.split("@")[0]} !!</h2>
      
        <UserButton afterSignOutUrl="/login" />
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-cards">
        <div className="card balance">
          <h3>Balance</h3>
          <p>${parseFloat(summary.balance).toFixed(2)}</p>
        </div>
        <div className="card income">
          <h3>Income</h3>
          <p>${parseFloat(summary.income).toFixed(2)}</p>
        </div>
        <div className="card expenses">
          <h3>Expenses</h3>
          <p>-${Math.abs(parseFloat(summary.expenses)).toFixed(2)}</p>
        </div>
      </div>

      {/* Breakdown Pie Chart */}
      <BreakdownChart breakdown={breakdown} />

      {/* Create Transactions */}
      <CreateTransaction />

      {/* TRANSACTIONS */}
      {/* <TransactionsList transactions={transactions} handleDelete={handleDelete} /> */}
      <h3>Recent Transactions</h3>
          <button onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
      <PaginatedTransactions transactions={transactions} handleDelete={handleDelete} />
      


    </div>
  );
}
