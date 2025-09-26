// react custom hook file
import { useCallback, useState } from "react";

// const API_URL = "https://wallet-api-cxqp.onrender.com/api";
const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [breakdown, setBreakdown] = useState({ income: [], expenses: [] });

  // useCallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const fetchBreakdown = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/breakdown/${userId}`);
      const data = await response.json();
      setBreakdown(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary(), fetchBreakdown()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, fetchBreakdown, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete transaction");
      window.alert("Transaction deleted!");

      // Refresh data after deletion
      loadData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const createTransaction = async (transaction) => {
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create transaction");
      }

      await loadData(); // 🔥 auto refresh
      return true;
    } catch (error) {
      console.error("Error creating transaction:", error);
      return false;
    }
  };

  return { transactions, summary, breakdown, isLoading, loadData, deleteTransaction, createTransaction,};
};